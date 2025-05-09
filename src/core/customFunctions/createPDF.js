import { PDFDocument, rgb } from "pdf-lib";
import { pdfImg, pdfImgTop } from "../settings";

// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";

import * as fontkit from "fontkit";
import $ from "jquery";
import { CreateImageList } from "../3d-configurator";

// export async function createPDF() {
//   const pdfDoc = await PDFDocument.create();
//   const widthPage = 595;
//   const heightPage = 842;
//   const margin = 30;

//   pdfDoc.registerFontkit(fontkit);

//   const fontUrl = "public/fonts/Poppins/Poppins-Medium.ttf";
//   const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());
//   const font = await pdfDoc.embedFont(fontBytes);

//   const page1 = pdfDoc.addPage([widthPage, heightPage]);

//   // PAGE 1
//   const logoUrl = "public/img/hide-away-logo.png";

//   const logoImageBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
//   const logoImage = await pdfDoc.embedPng(logoImageBytes);
//   const pergolaImageBytes = await fetch(pdfImg.img).then((res) =>
//     res.arrayBuffer()
//   );

//   const bwImageBytes = pergolaImageBytes;
//   const bwImage = await pdfDoc.embedPng(bwImageBytes);

//   const logoPhoneBytes = await fetch("public/pdf/icon_phone.png").then((res) =>
//     res.arrayBuffer()
//   );
//   const logoEarthBytes = await fetch("public/pdf/icon_web.png").then((res) =>
//     res.arrayBuffer()
//   );
//   const logoMailBytes = await fetch("public/pdf/icon_email.png").then((res) =>
//     res.arrayBuffer()
//   );

//   const logoPhone = await pdfDoc.embedPng(logoPhoneBytes);
//   const logoEarth = await pdfDoc.embedPng(logoEarthBytes);
//   const logoMail = await pdfDoc.embedPng(logoMailBytes);

//   //#region Header
//   const logoWidth = widthPage;
//   const logoHeight = 108;

//   page1.drawImage(logoImage, {
//     x: (widthPage - logoWidth) / 2,
//     y: heightPage - logoHeight,
//     width: logoWidth,
//     height: logoHeight,
//   });

//   const pergolaWidth = widthPage * 0.7;
//   const perolaHeight = 215;

//   page1.drawImage(bwImage, {
//     x: (widthPage - pergolaWidth) / 2,
//     y: heightPage - perolaHeight - logoHeight,
//     width: pergolaWidth,
//     height: perolaHeight,
//   });
//   //#endregion

//   const fontSize = 12;
//   const colorSecondFooter = rgb(245 / 255, 243 / 255, 235 / 255);
//   const colorSecond = rgb(114 / 255, 108 / 255, 86 / 255);

//   const listItems = $(".sum__page__main-list").find(
//     ".sum__page__main-list__item"
//   );

//   const startY = heightPage - logoHeight - perolaHeight - margin;
//   const lineHeight = 60;
//   let currentY = startY;

//   listItems.slice(0, 4).each((index, item) => {
//     const title = $(item).find(".sum__page__main-list__item__title").text();
//     const param = $(item).find(".sum__page__main-list__item__param").text();

//     page1.drawText(title, {
//       x: margin,
//       y: currentY,
//       size: fontSize,
//       font: font,
//       color: rgb(0, 0, 0),
//     });

//     const textWidth = font.widthOfTextAtSize(param, fontSize);

//     page1.drawText(param, {
//       x: widthPage - margin - textWidth,
//       y: currentY,
//       size: fontSize,
//       font: font,
//       color: colorSecond,
//     });

//     const underlineY = currentY - 26;

//     page1.drawLine({
//       start: { x: margin, y: underlineY },
//       end: { x: widthPage - margin, y: underlineY },
//       color: colorSecond,
//       thickness: 1,
//     });

//     currentY -= lineHeight;
//   });

//   //#region Footer
//   const phone = "+1 (925) 766-2678";
//   const earth = "www.chayaoutdoors.com";
//   const mail = "contact@chayaoutdoors.com";
//   const textWidthPhone = font.widthOfTextAtSize(phone, fontSize);
//   const textWidthEarth = font.widthOfTextAtSize(earth, fontSize);
//   const textWidthMail = font.widthOfTextAtSize(mail, fontSize);

//   const size = 10;

//   const startYlogo = 20;
//   const offsetY = 2;
//   const offsetX = 5;

//   page1.drawRectangle({
//     x: 0,
//     y: 0,
//     width: widthPage,
//     height: 55,
//     color: colorSecondFooter,
//   });

//   page1.drawImage(logoPhone, {
//     x: margin,
//     y: startYlogo,
//     width: size,
//     height: size,
//   });

//   page1.drawText(phone, {
//     x: margin + size + offsetX, // Розташування тексту праворуч від іконки
//     y: startYlogo + offsetY,
//     size: size,
//     font: font,
//     color: colorSecond,
//   });

//   page1.drawImage(logoEarth, {
//     x: widthPage / 2 - textWidthEarth / 2 - size - offsetX,
//     y: startYlogo,
//     width: size,
//     height: size,
//   });

//   page1.drawText(earth, {
//     x: (widthPage - textWidthEarth) / 2,
//     y: startYlogo + offsetY,
//     size: size,
//     font: font,
//     color: colorSecond,
//   });

//   // Малюємо пошту (mail)
//   page1.drawImage(logoMail, {
//     x: widthPage - textWidthMail - margin - size - offsetX,
//     y: startYlogo,
//     width: size,
//     height: size,
//   });

//   page1.drawText(mail, {
//     x: widthPage - textWidthMail - margin,
//     y: startYlogo + offsetY,
//     size: size,
//     font: font,
//     color: colorSecond,
//   });

//   //#endregion

//   // PAGE 2
//   const page2 = pdfDoc.addPage([widthPage, heightPage]);

//   page2.drawImage(logoImage, {
//     x: (widthPage - logoWidth) / 2,
//     y: heightPage - logoHeight,
//     width: logoWidth,
//     height: logoHeight,
//   });

//   const fontTitle = 16;
//   const titleFirts = "Electrical Options";
//   const textTitleFirst = font.widthOfTextAtSize(titleFirts, fontTitle);
//   const titleSecond = "Accessories";
//   const textTitleSecond = font.widthOfTextAtSize(titleSecond, fontTitle);

//   page2.drawText(titleFirts, {
//     x: (widthPage - textTitleFirst) / 2,
//     y: heightPage - logoHeight - margin,
//     size: fontTitle,
//     font: font,
//     color: rgb(0, 0, 0),
//   });

//   const startYPage2 = heightPage - logoHeight - margin * 2;
//   const lineHeightPage2 = 35;
//   let currentYPage2 = startYPage2;

//   listItems.slice(4, 9).each((index, item) => {
//     const title = $(item).find(".sum__page__main-list__item__title").text();
//     const param = $(item).find(".sum__page__main-list__item__param").text();
//     let color = rgb(0, 0, 0);
//     const colorSecond = rgb(153 / 255, 122 / 255, 79 / 255);

//     if (title === "Spacing") {
//       color = colorSecond;
//     }

//     page2.drawText(title, {
//       x: margin,
//       y: currentYPage2,
//       size: fontSize,
//       font: font,
//       color: color,
//     });

//     const textWidth = font.widthOfTextAtSize(param, fontSize);

//     page2.drawText(param, {
//       x: widthPage - margin - textWidth,
//       y: currentYPage2,
//       size: fontSize,
//       font: font,
//       color: color,
//     });

//     currentYPage2 -= lineHeightPage2;
//   });

//   page2.drawText(titleSecond, {
//     x: (widthPage - textTitleSecond) / 2,
//     y: heightPage - currentYPage2 + 100,
//     size: fontTitle,
//     font: font,
//     color: rgb(0, 0, 0),
//   });

//   const startYPage2second = heightPage - currentYPage2 + 75;
//   const lineHeightPage2second = 35;
//   let currentYPage2second = startYPage2second;

//   listItems.slice(9).each((index, item) => {
//     const title = $(item).find(".sum__page__main-list__item__title").text();
//     const param = $(item).find(".sum__page__main-list__item__param").text();
//     let color = rgb(0, 0, 0);
//     const colorSecond = rgb(153 / 255, 122 / 255, 79 / 255);

//     if (title === "Pattern" || title === "Color") {
//       color = colorSecond;
//     }

//     page2.drawText(title, {
//       x: margin,
//       y: currentYPage2second,
//       size: fontSize,
//       font: font,
//       color: color,
//     });

//     const textWidth = font.widthOfTextAtSize(param, fontSize);

//     page2.drawText(param, {
//       x: widthPage - margin - textWidth,
//       y: currentYPage2second,
//       size: fontSize,
//       font: font,
//       color: color,
//     });

//     currentYPage2second -= lineHeightPage2second;
//   });

//   //#region Footer
//   page2.drawRectangle({
//     x: 0,
//     y: 0,
//     width: widthPage,
//     height: 55,
//     color: colorSecondFooter,
//   });

//   page2.drawImage(logoPhone, {
//     x: margin,
//     y: startYlogo,
//     width: size,
//     height: size,
//   });

//   page2.drawText(phone, {
//     x: margin + size + offsetX,
//     y: startYlogo + offsetY,
//     size: size,
//     font: font,
//     color: colorSecond,
//   });

//   page2.drawImage(logoEarth, {
//     x: widthPage / 2 - textWidthEarth / 2 - size - offsetX,
//     y: startYlogo,
//     width: size,
//     height: size,
//   });

//   page2.drawText(earth, {
//     x: (widthPage - textWidthEarth) / 2,
//     y: startYlogo + offsetY,
//     size: size,
//     font: font,
//     color: colorSecond,
//   });

//   page2.drawImage(logoMail, {
//     x: widthPage - textWidthMail - margin - size - offsetX,
//     y: startYlogo,
//     width: size,
//     height: size,
//   });

//   page2.drawText(mail, {
//     x: widthPage - textWidthMail - margin,
//     y: startYlogo + offsetY,
//     size: size,
//     font: font,
//     color: colorSecond,
//   });

//   //#endregion

//   const pdfBytes = await pdfDoc.save();
//   const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
//   const pdfUrl = URL.createObjectURL(pdfBlob);

//   // Створюємо тимчасове посилання <a> для завантаження файлу
//   const link = document.createElement("a");
//   link.href = pdfUrl;
//   link.download = "document.pdf"; // Додаємо назву, щоб Safari завантажив PDF

//   document.body.appendChild(link);

//   // Симулюємо клік — Safari має завантажити файл
//   link.click();

//   // Чистимо DOM після завантаження
//   document.body.removeChild(link);
//   URL.revokeObjectURL(pdfUrl);
// }

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

const pdf_logo_url = "public/img/logoPDf.png";
const pdf_water_mark_url = "public/img/water-mark.png";
const pdf_icon_web_url =
  "https://royalcovers.com/wp-content/uploads/2025/03/web.png";
const pdf_icon_phone_url =
  "https://royalcovers.com/wp-content/uploads/2025/03/phone.png";
const pdf_icon_email_url =
  "https://royalcovers.com/wp-content/uploads/2025/03/mail.png";

export async function createPDF(opt = "open") {
  // await CreateImageList();

  console.log(pdfImg.img, pdfImgTop.img);

  const uiPdfPhone = "(713) 893-1915";
  const uiPdfEmail = "info@koolcovers.com";
  const uiPdfWeb = "www.koolcovershouston.com";

  const mainMargins = [30, 130, 30, 60];

  const imageUrls = [
    pdf_logo_url,
    pdf_icon_web_url,
    pdf_icon_phone_url,
    pdf_icon_email_url,
    pdf_water_mark_url,
  ];

  // pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // pdfMake.fonts = {
  //   Roboto: {
  //     bold: "Roboto-Medium.ttf",
  //     italics: "Roboto-Italic.ttf",
  //     bolditalics: "Roboto-MediumItalic.ttf",
  //   },
  // };

  const promises = imageUrls.map(async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    return await new Promise((resolve, reject) => {
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  });

  function metersToInches(meters) {
    const inchesPerMeter = 39.3701;
    return Math.round(meters * inchesPerMeter);
  }

  const { span_width, span_depth } = pergola.getSpanPoints();

  Promise.all(promises)
    .then(
      ([
        logoImage,
        websiteIconImage,
        phoneIconImage,
        emailIconImage,
        waterMarkImge,
      ]) => {
        const headerContent = {
          stack: [
            {
              image: logoImage,
              width: 80,
              margin: [0, 0, 0, 0],
            },
          ],
          alignment: "center",
        };

        let textColorForZip = "";

        $(".ar_filter_group_13")
          .find(".ar_filter_options .option")
          .each(function () {
            const $this = $(this);

            if ($this.hasClass("active")) {
              textColorForZip = $this.find(".component_title").text();
            }
          });

        const valueColor = "#0B70A2";
        const footerColor = "#06AEEF";
        const footerColorWhite = "#FFFFFF";

        function rgbToHex(rgb) {
          const result = rgb.match(/\d+/g);

          const red = parseInt(result[0]).toString(16).padStart(2, "0");
          const green = parseInt(result[1]).toString(16).padStart(2, "0");
          const blue = parseInt(result[2]).toString(16).padStart(2, "0");

          return `#${red}${green}${blue}`;
        }

        const footerContent = function () {
          return [
            {
              margin: [0, 0, 0, 0],
              table: {
                widths: [12, "auto", "*", 12, "auto", "*", 12, "auto"],
                body: [
                  [
                    {
                      image: phoneIconImage,
                      margin: [0, 25, -30, 30],
                      width: 8,
                      height: 8,
                      alignment: "center",
                      style: "footer",
                    },
                    {
                      text: uiPdfPhone,
                      margin: [30, 25, 0, 30],
                      alignment: "center", // ÃƒÂÃ‚Â¦ÃƒÂÃ‚ÂµÃƒÂÃ‚Â½Ãƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã†â€™ÃƒÂÃ‚Â²ÃƒÂÃ‚Â°ÃƒÂÃ‚Â½ÃƒÂÃ‚Â½Ãƒâ€˜Ã‚Â Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚ÂµÃƒÂÃ‚ÂºÃƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã†â€™
                      style: "footer",
                      color: footerColorWhite, // ÃƒÂÃ¢â‚¬ËœÃƒâ€˜Ã¢â‚¬â€œÃƒÂÃ‚Â»ÃƒÂÃ‚Â¸ÃƒÂÃ‚Â¹ ÃƒÂÃ‚ÂºÃƒÂÃ‚Â¾ÃƒÂÃ‚Â»Ãƒâ€˜Ã¢â‚¬â€œÃƒâ€˜Ã¢â€šÂ¬ Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚ÂµÃƒÂÃ‚ÂºÃƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã†â€™
                    },
                    { text: "" },
                    {
                      image: emailIconImage,
                      width: 8,
                      height: 8,
                      alignment: "center", // ÃƒÂÃ‚Â¦ÃƒÂÃ‚ÂµÃƒÂÃ‚Â½Ãƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã†â€™ÃƒÂÃ‚Â²ÃƒÂÃ‚Â°ÃƒÂÃ‚Â½ÃƒÂÃ‚Â½Ãƒâ€˜Ã‚Â Ãƒâ€˜Ã¢â‚¬â€œÃƒÂÃ‚ÂºÃƒÂÃ‚Â¾ÃƒÂÃ‚Â½ÃƒÂÃ‚ÂºÃƒÂÃ‚Â¸
                      margin: [0, 25, 0, 30],
                    },
                    {
                      text: uiPdfEmail,
                      link: `mailto:${uiPdfEmail}`,
                      margin: [0, 25, 0, 30],
                      alignment: "center", // ÃƒÂÃ‚Â¦ÃƒÂÃ‚ÂµÃƒÂÃ‚Â½Ãƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã†â€™ÃƒÂÃ‚Â²ÃƒÂÃ‚Â°ÃƒÂÃ‚Â½ÃƒÂÃ‚Â½Ãƒâ€˜Ã‚Â Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚ÂµÃƒÂÃ‚ÂºÃƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã†â€™
                      style: "footer",
                      color: footerColorWhite, // ÃƒÂÃ¢â‚¬ËœÃƒâ€˜Ã¢â‚¬â€œÃƒÂÃ‚Â»ÃƒÂÃ‚Â¸ÃƒÂÃ‚Â¹ ÃƒÂÃ‚ÂºÃƒÂÃ‚Â¾ÃƒÂÃ‚Â»Ãƒâ€˜Ã¢â‚¬â€œÃƒâ€˜Ã¢â€šÂ¬ Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚ÂµÃƒÂÃ‚ÂºÃƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã†â€™
                    },
                    { text: "" },
                    {
                      image: websiteIconImage,
                      width: 8,
                      height: 8,
                      alignment: "center", // ÃƒÂÃ‚Â¦ÃƒÂÃ‚ÂµÃƒÂÃ‚Â½Ãƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã†â€™ÃƒÂÃ‚Â²ÃƒÂÃ‚Â°ÃƒÂÃ‚Â½ÃƒÂÃ‚Â½Ãƒâ€˜Ã‚Â Ãƒâ€˜Ã¢â‚¬â€œÃƒÂÃ‚ÂºÃƒÂÃ‚Â¾ÃƒÂÃ‚Â½ÃƒÂÃ‚ÂºÃƒÂÃ‚Â¸
                      margin: [0, 25, 0, 30],
                    },
                    {
                      text: uiPdfWeb,
                      link: uiPdfWeb,
                      margin: [0, 25, 30, 30],
                      alignment: "center", // ÃƒÂÃ‚Â¦ÃƒÂÃ‚ÂµÃƒÂÃ‚Â½Ãƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã¢â€šÂ¬Ãƒâ€˜Ã†â€™ÃƒÂÃ‚Â²ÃƒÂÃ‚Â°ÃƒÂÃ‚Â½ÃƒÂÃ‚Â½Ãƒâ€˜Ã‚Â Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚ÂµÃƒÂÃ‚ÂºÃƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã†â€™
                      style: "footer",
                      color: footerColorWhite, // ÃƒÂÃ¢â‚¬ËœÃƒâ€˜Ã¢â‚¬â€œÃƒÂÃ‚Â»ÃƒÂÃ‚Â¸ÃƒÂÃ‚Â¹ ÃƒÂÃ‚ÂºÃƒÂÃ‚Â¾ÃƒÂÃ‚Â»Ãƒâ€˜Ã¢â‚¬â€œÃƒâ€˜Ã¢â€šÂ¬ Ãƒâ€˜Ã¢â‚¬Å¡ÃƒÂÃ‚ÂµÃƒÂÃ‚ÂºÃƒâ€˜Ã‚ÂÃƒâ€˜Ã¢â‚¬Å¡Ãƒâ€˜Ã†â€™
                    },
                  ],
                ],
              },
              fillColor: footerColor,
              layout: "noBorders", // ÃƒÂÃ¢â‚¬ËœÃƒÂÃ‚ÂµÃƒÂÃ‚Â· ÃƒÂÃ‚ÂºÃƒÂÃ‚Â¾Ãƒâ€˜Ã¢â€šÂ¬ÃƒÂÃ‚Â´ÃƒÂÃ‚Â¾ÃƒÂÃ‚Â½Ãƒâ€˜Ã¢â‚¬â€œÃƒÂÃ‚Â²
            },
          ];
        };

        function generatePDFcontentFromOverview() {
          const itemsOverview = $(".sum__page__main-list__item");
          const content = [];

          itemsOverview.each(function () {
            const title = $(this)
              .find(".sum__page__main-list__title")
              .text()
              .toUpperCase();

            const list = $(this).find(".sum__page__main-list__info");
            const itemList = [];

            list.each(function () {
              const title = $(this)
                .find(".sum__page__main-list__info__title")
                .text();
              const backgroundColorTitle = $(this)
                .find(".sum__page__main-list__info__color")
                .css("background-color");

              const value = $(this)
                .find(".sum__page__main-list__info__param")
                .text();

              const result = [];

              if (
                backgroundColorTitle &&
                backgroundColorTitle !== "rgba(0, 0, 0, 0)"
              ) {
                const colorHex = rgbToHex(backgroundColorTitle);

                function generateEllipseImage(colorHex) {
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d");

                  const width = 20;
                  const height = 20;
                  const radiusX = 9; // Ã ÃÂ°ÃÂ´Ã‘â€“Ã‘Æ’Ã‘Â ÃÂ¿ÃÂ¾ ÃÂ¾Ã‘ÂÃ‘â€“ X (ÃÂ¿ÃÂ¾ÃÂ»ÃÂ¾ÃÂ²ÃÂ¸ÃÂ½ÃÂ° Ã‘Ë†ÃÂ¸Ã‘â‚¬ÃÂ¸ÃÂ½ÃÂ¸ ÃÂµÃÂ»Ã‘â€“ÃÂ¿Ã‘ÂÃÂ°)
                  const radiusY = 9; // Ã ÃÂ°ÃÂ´Ã‘â€“Ã‘Æ’Ã‘Â ÃÂ¿ÃÂ¾ ÃÂ¾Ã‘ÂÃ‘â€“ Y (ÃÂ¿ÃÂ¾ÃÂ»ÃÂ¾ÃÂ²ÃÂ¸ÃÂ½ÃÂ° ÃÂ²ÃÂ¸Ã‘ÂÃÂ¾Ã‘â€šÃÂ¸ ÃÂµÃÂ»Ã‘â€“ÃÂ¿Ã‘ÂÃÂ°)

                  canvas.width = width;
                  canvas.height = height;

                  ctx.beginPath();
                  ctx.ellipse(
                    width / 2,
                    height / 2,
                    radiusX,
                    radiusY,
                    0,
                    0,
                    Math.PI * 2
                  );
                  ctx.fillStyle = colorHex;
                  ctx.fill();
                  ctx.lineWidth = 0;

                  return canvas.toDataURL("image/png");
                }

                const ellipseImg = generateEllipseImage(colorHex);

                result.push({
                  image: ellipseImg,
                  width: 20,
                  height: 20,
                  alignment: "left",
                  style: "itemValue",
                  margin: [0, 0, 0, 0],
                  border: [false, false, false, false],
                });
              } else {
                result.push({
                  text: title,
                  style: "itemFirst",
                  border: [false, false, false, false],
                });
              }

              result.push({
                text: value,
                style: "itemValueFirst",
                border: [false, false, false, false],
              });

              itemList.push(result);
            });

            const result = {
              style: "tableItemLeft",
              table: {
                widths: "*",
                body: [
                  [
                    {
                      text: title,
                      style: "tableHeader",
                      colSpan: 2,
                      border: [false, false, false, false],
                    },
                    {
                      text: "",
                      fillColor: "#476593",
                      height: 0,
                      colSpan: 2,
                      border: [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text: "",
                      colSpan: 2,
                      border: [false, true, false, false],
                      height: 1,
                      style: "lineStyle",
                    },
                    // {
                    //   text: "",
                    //   colSpan: 2,
                    //   border: [false, false, false, false],
                    // },
                  ],
                  ...itemList,
                ],
              },
            };

            content.push(result);
          });

          return content;
        }

        const pdfContent = [
          {
            margin: [40, 0, 0, 0],
            columns: [
              {
                image: pdfImg.img,
                width: 250,
                height: 120, // Встановлюємо висоту
                margin: [0, 0, 0, 0],
              },
              {
                image: pdfImgTop.img,
                width: 250,
                height: 120, // Встановлюємо висоту
                margin: [0, 0, 0, 0],
              },
              {
                image: waterMarkImge,
                width: 80,
                height: 80, // Встановлюємо висоту watermark
                absolutePosition: { x: 150, y: 160 }, // Вказуємо позицію поверх першого зображення
                margin: [0, 0, 0, 0],
                rotate: 45, // Обертання на 45 градусів
                opacity: 1, // Прозорість watermark
                zIndex: 99, // Забезпечуємо, щоб watermark був поверх зображень
              },
              {
                image: waterMarkImge,
                width: 80,
                height: 80, // Встановлюємо висоту watermark
                absolutePosition: { x: 400, y: 160 }, // Вказуємо позицію поверх другого зображення
                margin: [0, 0, 0, 0],
                rotate: 45, // Обертання на 45 градусів
                opacity: 1, // Прозорість watermark
                zIndex: 99, // Забезпечуємо, щоб watermark був поверх зображень
              },
            ],
          },
          {
            columns: [[...generatePDFcontentFromOverview()]],
          },
        ];

        const fontSize = 10;

        // -------------------------------------------------
        const pdfDefinition = {
          pageMargins: mainMargins,
          header: headerContent,
          content: pdfContent,
          footer: footerContent,

          styles: {
            tableTitle: {
              fontSize: 12,
              bold: false,
              font: "Roboto",
              color: "#FFFFFF",
            },
            tableItemTitle: { fontSize: 12, bold: true, font: "Roboto" },
            tableItemText: { fontSize: 12, bold: false, font: "Roboto" },
            footer: { fontSize: 8, bold: false, font: "Roboto" },
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10],
            },
            subheader: {
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 5],
            },
            tableExample: {
              margin: [0, 5, 0, 15],
            },
            tableHeader: {
              borderBottom: "1px solid #0B70A2",
              bold: true,
              fontSize: fontSize,
              color: "black",
              alignment: "center",
              margin: [0, 5, 0, 8],
            },
            item: {
              fontSize: fontSize,
              color: "black",
              alignment: "left",
              margin: [0, 10, 0, 0],
            },
            itemFirst: {
              fontSize: fontSize,
              color: "black",
              alignment: "left",
              margin: [0, 0, 0, 0],
            },
            itemValue: {
              fontSize: fontSize,
              color: valueColor,
              alignment: "right",
              margin: [0, 10, 0, 0],
            },
            itemValueFirst: {
              fontSize: fontSize,
              color: valueColor,
              alignment: "right",
              margin: [0, 0, 0, 0],
            },
            tableItem: {
              fontSize: fontSize,
              width: 237,
            },
            tableItemRight: {
              fontSize: 0,
              margin: [0, 0, 0, 0],
            },
            tableItemLeft: {
              fontSize: fontSize,
              width: 237,
              margin: [0, 0, 0, 0],
            },
            lineStyle: {
              borderBottom: "0.5px solid #0B70A2",
              borderTop: "0.5px solid #0B70A2",
              marginBottom: 5,
            },
          },
          defaultStyle: { font: "Roboto" },
        };
        // -------------------------------------------------
        switch (opt) {
          case "open":
            pdfMake.createPdf(pdfDefinition).open();
            break;

          case "download":
            pdfMake.createPdf(pdfDefinition).download("Royal Cover.pdf");
            break;

          case "all":
            pdfMake.createPdf(pdfDefinition).getBlob((pdfBlob) => {
              const urlForTab = URL.createObjectURL(pdfBlob);
              window.open(urlForTab);

              const link = document.createElement("a");
              link.href = urlForTab;
              link.download = "Royal Cover.pdf";
              link.click();

              URL.revokeObjectURL(urlForTab);
            });
            break;

          default:
            break;
        }
      }
    )
    .catch((error) => {
      console.error("Image loading error:", error);
    });
}
