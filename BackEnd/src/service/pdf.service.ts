import PDFDocument from "pdfkit";
import fs from "fs";

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
}

function generateCustomerInformation(
  doc: PDFKit.PDFDocument,
  invoice: Invoice
) {
  // Remaining code...
}

function generateInvoiceTable(doc: PDFKit.PDFDocument, invoice: Invoice) {
  // Remaining code...
}

function generateFooter(doc: PDFKit.PDFDocument) {
  // Remaining code...
}

function generateHr(doc: PDFKit.PDFDocument, y: number) {
  // Remaining code...
}

function formatDate(date: Date) {
  // Remaining code...
}

function formatCurrency(amount: number) {
  // Remaining code...
}

export { buildPDF };