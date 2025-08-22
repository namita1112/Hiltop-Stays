const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function generateInvoicePDF_HTML(guest, booking) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--allow-file-access-from-files',
      '--enable-local-file-accesses'
    ]
  });
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 1. Read HTML template
  const htmlPath = path.join(__dirname, "../templates/invoiceTemplate.html");
  let htmlContent = fs.readFileSync(htmlPath, "utf8");

  // 2. Get absolute paths for images
  const logoPath = `https://res.cloudinary.com/dytbju4xg/image/upload/v1749387662/hiltop_staysLogo_crop_bdigev.png`;
  const qrPath = `https://res.cloudinary.com/dytbju4xg/image/upload/v1753449548/frame_wtoprv.png`;
  // const logoPath = path.resolve(__dirname, "../assets/hiltop_staysLogo_crop.png");
  // const qrPath = path.resolve(__dirname, "../assets/frame.png");

  // 3. Inject data and image paths
  htmlContent = htmlContent
    .replace("{{hotelName}}", booking.hotelName)
    .replace("{{hotelCity}}", "Mahabaleshwar")
    .replace("{{checkIn}}", booking.checkInDate)
    .replace("{{checkOut}}", booking.checkOutDate)
    .replace("{{bookingId}}", booking.hotelId)
    .replace("{{firstName}}", guest.firstName)
    .replace("{{lastName}}", guest.lastName)
    .replace("{{phone}}", guest.phone)
    .replace("{{invoiceNo}}", "865MH572df48493020")
    .replace("{{date}}", new Date().toLocaleDateString("en-GB"))
    .replace("{{basePrice}}", booking.basePrice)
    .replace("{{discount}}", booking.discountPrice)
    .replace("{{priceAfterDiscount}}", booking.totalPrice)
    .replace("{{grandTotal}}", booking.grandTotal)
    .replace("{{paid}}", booking.amountPaid)
    .replace("{{remaining}}", booking.remainingPrice)
    .replace("{{logoPath}}", logoPath)
    .replace("{{qrPath}}", qrPath);

  // 4. Set content and generate PDF
  await page.setContent(htmlContent, { waitUntil: "load" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20px", bottom: "30px", left: "40px", right: "40px" },
  });

  await browser.close();
  return pdfBuffer;
}

module.exports = generateInvoicePDF_HTML;
