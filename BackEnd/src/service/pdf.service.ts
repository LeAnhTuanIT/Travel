import PDFDocument from "pdfkit";
import fs from "fs";
import { AnyExpression } from "mongoose";
import { compare } from "bcryptjs";
const fontPath: string = "./src/assets/font/Arial-Unicode-MS.ttf";
const fontBuffer = fs.readFileSync(fontPath);

interface Invoice {
  invoice_number: string;
  invoice_date: Date;
  balance: number;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  tour: {
    name: string;
    price: number;
    quantity: number;
    total: number;
    received: number;
    remainingAmount: number;
    companyAddress: string;
  };
}

const buildPDF = async (object: any): Promise<Buffer> => {
  const invoice: Invoice = {
    invoice_number: object.transactionId,
    invoice_date: new Date(),
    balance: object.amount,
    customer: {
      name: object.user.name,
      email: object.user.email,
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    tour: {
      name: object.tour.name,
      price: object.tour.price,
      quantity: object.quantity,
      total: object.amount,
      received: object.received,
      remainingAmount: object.amount - object.received,
      companyAddress: "36 Ung Văn Khiêm, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh",
    },
  };

  const chunks: Buffer[] = [];
  const doc = new PDFDocument({ margin: 50 });
  doc.registerFont("ArialUnicodeMS", fontBuffer);
  let resolve: (value?: Buffer | PromiseLike<Buffer>) => void;

  const promise = new Promise<Buffer>((res: any) => {
    resolve = res;
  });

  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {
    const pdfBytes = Buffer.concat(chunks);
    resolve(pdfBytes);
  });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();

  return promise;
};

function generateHeader(doc: PDFKit.PDFDocument) {
  // Remaining code...
  const ImgUrl = "https://travel-my-uploads.s3.ap-southeast-1.amazonaws.com/Background-1700737326404-812661581.png"
  doc
    // .image(fs.readFileSync("./images/logo.png"), 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .font("ArialUnicodeMS")
    .text("LOVE TRAVEL", 110, 57)
    .fontSize(10)
    .text("TravelLove", 200, 65, { align: "right" })
    .text("475A, Điện Biên Phủ, Bình Thạnh, TP. Hồ Chí Minh", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(
  doc: any,
  invoice: Invoice
) {
  // Remaining code...
  const { customer, tour } = invoice;

  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(`Hóa đơn #${invoice.invoice_number}`, 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Tên khách hàng:", 50, customerInformationTop)
    .font("ArialUnicodeMS")
    .text(customer.name, 150, customerInformationTop)
    .font("ArialUnicodeMS")
    .text("Email:", 50, customerInformationTop + 15)
    .text(customer.email, 150, customerInformationTop + 15)
    .text("Tour:", 50, customerInformationTop + 30)
    .text(tour.name, 150, customerInformationTop + 30)
    .text("Giá:", 50, customerInformationTop + 45)
    .text(formatCurrency(tour.price), 150, customerInformationTop + 45)
    .text("Số lượng:", 50, customerInformationTop + 60)
    .text(tour.quantity.toString(), 150, customerInformationTop + 60)
    .text("Tổng tiền hóa đơn:", 50, customerInformationTop + 75)
    .text(formatCurrency(tour.total), 150, customerInformationTop + 75)
    .text("Tổng tiền đã nhân:", 50, customerInformationTop + 90)
    .text(formatCurrency(tour.received), 150, customerInformationTop + 90)
    .text("Số tiền còn lại:", 50, customerInformationTop + 105)
    .text(formatCurrency(tour.remainingAmount), 150, customerInformationTop + 105)
    .text("Quý khách vui lòng thanh toán số tiền còn lại tại quầy thu ngân:", 50,customerInformationTop + 150)
    .text("Tại địa chỉ:" + tour.companyAddress, 50, customerInformationTop + 165)

  generateHr(doc, 400);
}

function generateInvoiceTable(doc: AnyExpression, invoice: Invoice) {
  // Remaining code...
  // Not user function generateTableRow
}

function generateFooter(doc: AnyExpression) {
  // Remaining code...
  doc
    .fontSize(10)
    .text("Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.", 50, 780, {
      align: "center",
      width: 500,
    });
}

function generateHr(doc: any, y: number) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatDate(date: Date) {
  // Remaining code...
}

function formatCurrency(amount: number) {
  // Remaining code...
  return new Intl.NumberFormat().format(amount);
}

export { buildPDF };