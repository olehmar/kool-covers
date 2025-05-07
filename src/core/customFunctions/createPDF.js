import { PDFDocument, rgb } from "pdf-lib";
import { pdfImg } from "../settings";
import * as fontkit from "fontkit";
import $ from "jquery";

export async function createPDF() {
  const pdfDoc = await PDFDocument.create();
  const widthPage = 595;
  const heightPage = 842;
  const margin = 30;

  pdfDoc.registerFontkit(fontkit);

  const fontUrl = "public/fonts/Poppins/Poppins-Medium.ttf";
  const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
  const font = await pdfDoc.embedFont(fontBytes);

  const page1 = pdfDoc.addPage([widthPage, heightPage]);

  // PAGE 1
  const logoUrl = "public/img/hide-away-logo.png";

  const logoImageBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
  const logoImage = await pdfDoc.embedPng(logoImageBytes);
  const pergolaImageBytes = await fetch(pdfImg.img).then((res) =>
    res.arrayBuffer()
  );

  const bwImageBytes = pergolaImageBytes;
  const bwImage = await pdfDoc.embedPng(bwImageBytes);

  const logoPhoneBytes = await fetch("public/pdf/icon_phone.png").then((res) =>
    res.arrayBuffer()
  );
  const logoEarthBytes = await fetch("public/pdf/icon_web.png").then((res) =>
    res.arrayBuffer()
  );
  const logoMailBytes = await fetch("public/pdf/icon_email.png").then((res) =>
    res.arrayBuffer()
  );

  const logoPhone = await pdfDoc.embedPng(logoPhoneBytes);
  const logoEarth = await pdfDoc.embedPng(logoEarthBytes);
  const logoMail = await pdfDoc.embedPng(logoMailBytes);

  //#region Header
  const logoWidth = widthPage;
  const logoHeight = 108;

  page1.drawImage(logoImage, {
    x: (widthPage - logoWidth) / 2,
    y: heightPage - logoHeight,
    width: logoWidth,
    height: logoHeight,
  });

  const pergolaWidth = widthPage * 0.7;
  const perolaHeight = 215;

  page1.drawImage(bwImage, {
    x: (widthPage - pergolaWidth) / 2,
    y: heightPage - perolaHeight - logoHeight,
    width: pergolaWidth,
    height: perolaHeight,
  });
  //#endregion

  const fontSize = 12;
  const colorSecondFooter = rgb(245 / 255, 243 / 255, 235 / 255);
  const colorSecond = rgb(114 / 255, 108 / 255, 86 / 255);

  const listItems = $(".sum__page__main-list").find(
    ".sum__page__main-list__item"
  );

  const startY = heightPage - logoHeight - perolaHeight - margin;
  const lineHeight = 60;
  let currentY = startY;

  listItems.slice(0, 4).each((index, item) => {
    const title = $(item).find(".sum__page__main-list__item__title").text();
    const param = $(item).find(".sum__page__main-list__item__param").text();

    page1.drawText(title, {
      x: margin,
      y: currentY,
      size: fontSize,
      font: font,
      color: rgb(0, 0, 0),
    });

    const textWidth = font.widthOfTextAtSize(param, fontSize);

    page1.drawText(param, {
      x: widthPage - margin - textWidth,
      y: currentY,
      size: fontSize,
      font: font,
      color: colorSecond,
    });

    const underlineY = currentY - 26;

    page1.drawLine({
      start: { x: margin, y: underlineY },
      end: { x: widthPage - margin, y: underlineY },
      color: colorSecond,
      thickness: 1,
    });

    currentY -= lineHeight;
  });

  //#region Footer
  const phone = "+1 (925) 766-2678";
  const earth = "www.chayaoutdoors.com";
  const mail = "contact@chayaoutdoors.com";
  const textWidthPhone = font.widthOfTextAtSize(phone, fontSize);
  const textWidthEarth = font.widthOfTextAtSize(earth, fontSize);
  const textWidthMail = font.widthOfTextAtSize(mail, fontSize);

  const size = 10;

  const startYlogo = 20;
  const offsetY = 2;
  const offsetX = 5;

  page1.drawRectangle({
    x: 0,
    y: 0,
    width: widthPage,
    height: 55,
    color: colorSecondFooter,
  });

  page1.drawImage(logoPhone, {
    x: margin,
    y: startYlogo,
    width: size,
    height: size,
  });

  page1.drawText(phone, {
    x: margin + size + offsetX, // Розташування тексту праворуч від іконки
    y: startYlogo + offsetY,
    size: size,
    font: font,
    color: colorSecond,
  });

  page1.drawImage(logoEarth, {
    x: widthPage / 2 - textWidthEarth / 2 - size - offsetX,
    y: startYlogo,
    width: size,
    height: size,
  });

  page1.drawText(earth, {
    x: (widthPage - textWidthEarth) / 2,
    y: startYlogo + offsetY,
    size: size,
    font: font,
    color: colorSecond,
  });

  // Малюємо пошту (mail)
  page1.drawImage(logoMail, {
    x: widthPage - textWidthMail - margin - size - offsetX,
    y: startYlogo,
    width: size,
    height: size,
  });

  page1.drawText(mail, {
    x: widthPage - textWidthMail - margin,
    y: startYlogo + offsetY,
    size: size,
    font: font,
    color: colorSecond,
  });

  //#endregion

  // PAGE 2
  const page2 = pdfDoc.addPage([widthPage, heightPage]);

  page2.drawImage(logoImage, {
    x: (widthPage - logoWidth) / 2,
    y: heightPage - logoHeight,
    width: logoWidth,
    height: logoHeight,
  });

  const fontTitle = 16;
  const titleFirts = "Electrical Options";
  const textTitleFirst = font.widthOfTextAtSize(titleFirts, fontTitle);
  const titleSecond = "Accessories";
  const textTitleSecond = font.widthOfTextAtSize(titleSecond, fontTitle);

  page2.drawText(titleFirts, {
    x: (widthPage - textTitleFirst) / 2,
    y: heightPage - logoHeight - margin,
    size: fontTitle,
    font: font,
    color: rgb(0, 0, 0),
  });

  const startYPage2 = heightPage - logoHeight - margin * 2;
  const lineHeightPage2 = 35;
  let currentYPage2 = startYPage2;

  listItems.slice(4, 9).each((index, item) => {
    const title = $(item).find(".sum__page__main-list__item__title").text();
    const param = $(item).find(".sum__page__main-list__item__param").text();
    let color = rgb(0, 0, 0);
    const colorSecond = rgb(153 / 255, 122 / 255, 79 / 255);

    if (title === "Spacing") {
      color = colorSecond;
    }

    page2.drawText(title, {
      x: margin,
      y: currentYPage2,
      size: fontSize,
      font: font,
      color: color,
    });

    const textWidth = font.widthOfTextAtSize(param, fontSize);

    page2.drawText(param, {
      x: widthPage - margin - textWidth,
      y: currentYPage2,
      size: fontSize,
      font: font,
      color: color,
    });

    currentYPage2 -= lineHeightPage2;
  });

  page2.drawText(titleSecond, {
    x: (widthPage - textTitleSecond) / 2,
    y: heightPage - currentYPage2 + 100,
    size: fontTitle,
    font: font,
    color: rgb(0, 0, 0),
  });

  const startYPage2second = heightPage - currentYPage2 + 75;
  const lineHeightPage2second = 35;
  let currentYPage2second = startYPage2second;

  listItems.slice(9).each((index, item) => {
    const title = $(item).find(".sum__page__main-list__item__title").text();
    const param = $(item).find(".sum__page__main-list__item__param").text();
    let color = rgb(0, 0, 0);
    const colorSecond = rgb(153 / 255, 122 / 255, 79 / 255);

    if (title === "Pattern" || title === "Color") {
      color = colorSecond;
    }

    page2.drawText(title, {
      x: margin,
      y: currentYPage2second,
      size: fontSize,
      font: font,
      color: color,
    });

    const textWidth = font.widthOfTextAtSize(param, fontSize);

    page2.drawText(param, {
      x: widthPage - margin - textWidth,
      y: currentYPage2second,
      size: fontSize,
      font: font,
      color: color,
    });

    currentYPage2second -= lineHeightPage2second;
  });

  //#region Footer
  page2.drawRectangle({
    x: 0,
    y: 0,
    width: widthPage,
    height: 55,
    color: colorSecondFooter,
  });

  page2.drawImage(logoPhone, {
    x: margin,
    y: startYlogo,
    width: size,
    height: size,
  });

  page2.drawText(phone, {
    x: margin + size + offsetX,
    y: startYlogo + offsetY,
    size: size,
    font: font,
    color: colorSecond,
  });

  page2.drawImage(logoEarth, {
    x: widthPage / 2 - textWidthEarth / 2 - size - offsetX,
    y: startYlogo,
    width: size,
    height: size,
  });

  page2.drawText(earth, {
    x: (widthPage - textWidthEarth) / 2,
    y: startYlogo + offsetY,
    size: size,
    font: font,
    color: colorSecond,
  });

  page2.drawImage(logoMail, {
    x: widthPage - textWidthMail - margin - size - offsetX,
    y: startYlogo,
    width: size,
    height: size,
  });

  page2.drawText(mail, {
    x: widthPage - textWidthMail - margin,
    y: startYlogo + offsetY,
    size: size,
    font: font,
    color: colorSecond,
  });

  //#endregion

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Створюємо тимчасове посилання <a> для завантаження файлу
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "document.pdf"; // Додаємо назву, щоб Safari завантажив PDF

  document.body.appendChild(link);

  // Симулюємо клік — Safari має завантажити файл
  link.click();

  // Чистимо DOM після завантаження
  document.body.removeChild(link);
  URL.revokeObjectURL(pdfUrl);
}

async function convertToBlackAndWhite(imageBytes) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = URL.createObjectURL(
      new Blob([imageBytes], { type: "image/png" })
    );

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const avg = (r + g + b) / 3;

        data[i] = data[i + 1] = data[i + 2] = avg;
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob(async (blob) => {
        const bwImageBytes = await blob.arrayBuffer();
        resolve(bwImageBytes);
      }, "image/png");
    };

    image.onerror = reject;
  });
}
