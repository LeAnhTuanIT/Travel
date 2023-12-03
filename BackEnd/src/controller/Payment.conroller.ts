import express, {Request, Response, NextFunction } from "express";
import Payment from "../model/Payment.model";
import User from "../model/User.model";
import Tour from "../model/Tour.model";
import asyncMiddleware from "../middleware/CatchAsyncError.middleware";
// const asyncMiddleware = require("../middleware/CatchAsyncError.middleware");
import ErrorHandler from "../utils/ErrorHandler.utils";
import sendMail from "../utils/SendMail.utils";

const pdfservice = require("../service/pdf.service");

const router = express.Router();

router.post(
  '/create-payment-deposit',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      let paymentData = req.body;
      const isExist = await Payment.findOne({
        transactionId: paymentData.transactionId,
      });
      if (isExist) {
        return next(new ErrorHandler('Transaction already exists', 400));
      }
      paymentData.quantity = Number(paymentData.quantity);
      paymentData.status = '1'; // deposit

      const tourId = paymentData.tourId;
      let userId: string | null = null; // nullable
      if (paymentData.userId) {
        userId = paymentData.userId;
      }
      let user: any;
      const tour: any = await Tour.findById(tourId);
      if (userId !== 'null') {
        user = await User.findById(userId);
      }
      console.log(user);

      paymentData.tour = tour;
      paymentData.user = user;
      paymentData.amount = tour.price * paymentData.quantity;
      const payment = await Payment.create(paymentData);
      const pdfBytes = await pdfservice.buildPDF(paymentData);

      const attachment = {
        filename: `Hóa đơn ${paymentData.transactionId}.pdf`,
        content: pdfBytes,
        contentType: 'application/pdf',
      };

      try {
        await sendMail({
          email: user.email,
          subject: 'Departure Schedule Information',
          message: `
          <h1>Successful Booking Notification</h1>
          <p>Dear ${user.name},</p>
          <p>Your booking has been successfully confirmed, and We will notify you of the departure date via phone number.</p>
          <p>Thank you for choosing our service.</p>
          <p>Best regards,</p>
          <p>Love Travel </p>
        `,
          attachment: attachment ,
        });
      } catch (error) {
        console.error(error);
        return next(new ErrorHandler('Failed to send email', 500));
      }

      res.status(201).json({
        success: true,
        payment,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  '/get-all-payments',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = 100; // Số tour trên mỗi trang (mặc định là 10)

      const totalTours = await Payment.countDocuments();
      // Tổng số lượng tour trong cơ sở dữ liệu

      const payments = await Payment.find({})
        .sort({ createAt: -1 })
        .limit(limit); // Lấy danh sách tour phân trang

      res.status(200).json({
        success: true,
        payments,
        totalTours,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get('/pdfmaker', (req: Request, res: Response, next: NextFunction) => {
  const chunks: any = [];
  pdfservice.buildPDF(
    (chunk: any) => {
      chunks.push(chunk);
    },
    () => {
      const pdfBytes = Buffer.concat(chunks);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="invoice.pdf"',
      });
      res.end(pdfBytes);
    }
  );
});

router.put(
  '/paid/:id',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = req.params.id;
      console.log(paymentId);

      const currentPayment: any = await Payment.findById(paymentId);

      const payment = await Payment.updateOne(
        { _id: paymentId },
        {
          $set: {
            received: currentPayment.amount,
            status: '2',
          },
        }
      );

      console.log(payment);
      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.put(
  '/cancel/:id',
  asyncMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = req.params.id;
      console.log(paymentId);

      const currentPayment = await Payment.findById(paymentId);

      const payment = await Payment.updateOne(
        { _id: paymentId },
        {
          $set: {
            status: '0',
          },
        }
      );

      console.log(payment);
      res.status(200).json({
        success: true,
      });
    } catch(error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;