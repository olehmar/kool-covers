import $ from "jquery";
import {
  modelForExport,
  pergolaConst,
  toggleLoad,
} from "../../../core/3d-configurator";
import { createPDF } from "../../../core/customFunctions/createPDF";
import { state } from "../../../core/settings";
import "./summaryPage.scss";
import { loadFormData } from "./summary-page-portal/summaryPagePortal";
export let countLeds = {
  count: 0,
};

function countVisibleMeshes(model, nameGroup) {
  let visibleCount = 0;

  model.traverse((object) => {
    console.log(object.name);

    if (nameGroup === "fan" && object.name === nameGroup && object.visible) {
      visibleCount++;
    } else if (
      object.name &&
      object.name.includes(nameGroup) &&
      object.visible &&
      nameGroup !== "fan"
    ) {
      visibleCount++;
    }
  });

  return visibleCount;
}

export function summaryPageComponent(container) {
  const model = state.model ? "LiteShade™" : "TitanCover™";
  const wall =
    [
      state.backWall && "Back Wall",
      state.leftWall && "Left Wall",
      state.rightWall && "Right Wall",
    ]
      .filter(Boolean)
      .join(", ") || "-";
  // const roof = state.model ? state.moodLight : "Louvered";
  const size = `${state.width}' x ${state.length}' x ${state.height}'`;
  // const postSize = state.initValuePostSize.includes("6")
  //   ? `6' x 6'`
  //   : state.initValuePostSize.includes("8")
  //   ? `8' x 8'`
  //   : `4' x 4'`;
  const frameColor = state.colorBody;
  const roofColor = state.colorRoof;

  const ledLight = state.ledLights ? `${countLeds.count}` : "No";
  const brightness =
    state.colorLed === "#FAFFC4" ? "3500 lumens" : "2500 lumens";
  const frequency = `Every ${state.recessedLighting} louvers`;
  const fans = state.fans ? `Yes` : "No";
  const heaters = state.heaters ? `Yes` : "No";

  const motorized = state.subSystem.has(pergolaConst.systemNameString.zip_shade)
    ? `Yes`
    : "No";
  const colorZip = state.subSystem.has(pergolaConst.systemNameString.zip_shade)
    ? `${state.colorZip}`
    : "No";

  const transparency = state.subSystem.has(
    pergolaConst.systemNameString.zip_shade
  )
    ? `${state.transparency}%`
    : "No";
  const slidingGlassDoor = state.subSystem.has(
    pergolaConst.systemNameString.sliding_doors
  )
    ? `Yes`
    : "No";
  const bifoldingGlassDoor = state.subSystem.has(
    pergolaConst.systemNameString.bifold_doors
  )
    ? `Yes`
    : "No";
  const fixedShutters = state.subSystem.has(
    pergolaConst.systemNameString.fix_shutters
  )
    ? `Yes`
    : "No";
  const slidingShutters = state.subSystem.has(
    pergolaConst.systemNameString.sliding_shutters
  )
    ? `Yes`
    : "No";
  const biFoldingShutters = state.subSystem.has(
    pergolaConst.systemNameString.bifold_shutters
  )
    ? `Yes`
    : "No";
  const fixedSlats = state.subSystem.has(
    pergolaConst.systemNameString.fix_shutters
  )
    ? `Yes`
    : "No";

  const summaryContent = $(`
    <div id="summary-content">
  <div class="sum__page" id="sum-page">
    <h2 class="sum__page__title">Your Pergola Looks Amazing!</h2>
    <div class="sum__page__close" id="sum-close"></div>

    <div id="js-summary-image-preview-1">
      <img class="sum__page__img" />
    </div>

    <ul class="sum__page__main-list">
      <li class="sum__page__main-list__item">
        <h3 class="sum__page__main-list__item__title">Wall Mounted</h3>
        <div class="sum__page__main-list__item__param">${wall}</div>
      </li>

      <li class="sum__page__main-list__item">
        <h3 class="sum__page__main-list__item__title">Dimensions</h3>
        <div class="sum__page__main-list__item__param">${size}</div>
      </li>

      <li class="sum__page__main-list__item">
        <h3 class="sum__page__main-list__item__title">Frame Color</h3>
        <div class="sum__page__main-list__item__param">${frameColor}</div>
      </li>

      <li class="sum__page__main-list__item">
        <h3 class="sum__page__main-list__item__title">Roof Color</h3>
        <div class="sum__page__main-list__item__param">${roofColor}</div>
      </li>
    </ul>

    <div class="sum__page__electrical-options">
      <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--el">Electrical Options</h3>
      
      <ul class="sum__page__main-list">
        <li class="sum__page__main-list__item sum__page__main-list__item--lil">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil">LED Lights</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil">${ledLight}</div>
        </li>

        ${
          state.ledLights
            ? `
            <li class="sum__page__main-list__item sum__page__main-list__item--lil" style="margin-left: 15px">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil sum__page__main-list__item__param--color">Frequency</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil sum__page__main-list__item__param--color">${frequency}</div>
        </li>
          `
            : ""
        }
      
         ${
           state.moodLight
             ? `
            <li class="sum__page__main-list__item sum__page__main-list__item--lil" style="margin-left: 15px">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil sum__page__main-list__item__param--color">Brightness</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil sum__page__main-list__item__param--color">${brightness}</div>
        </li>`
             : ""
         }
      

        <li class="sum__page__main-list__item sum__page__main-list__item--lil">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil">Fans</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil">${fans}</div>
        </li>

        <li class="sum__page__main-list__item sum__page__main-list__item--lil">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil">Heaters</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil">${heaters}</div>
        </li>
      </ul>
    </div> 

    <div class="sum__page__electrical-options">
      <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--el">Accessories</h3>
      
      <ul class="sum__page__main-list">
        <li class="sum__page__main-list__item sum__page__main-list__item--lil">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil">Motorized Zip Screen</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil">${motorized}</div>
        </li>

        <li class="sum__page__main-list__item sum__page__main-list__item--lil" style="margin-left: 15px">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil color-option">Color</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil color-option">${colorZip}</div>
        </li>

        <li class="sum__page__main-list__item sum__page__main-list__item--lil" style="margin-left: 15px">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil color-option">Transparency</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil color-option">${transparency}</div>
        </li>

        <li class="sum__page__main-list__item sum__page__main-list__item--lil">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil">Sliding Glass Door</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil">${slidingGlassDoor}</div>
        </li>

        <li class="sum__page__main-list__item sum__page__main-list__item--lil">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil">Bi-folding Glass Door</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil">${bifoldingGlassDoor}</div>
        </li>

        <li class="sum__page__main-list__item sum__page__main-list__item--lil">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil">Fixed Shutters</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil">${fixedShutters}</div>
        </li>

        <li class="sum__page__main-list__item sum__page__main-list__item--lil">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil">Sliding Shutters</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil">${slidingShutters}</div>
        </li>

        <li class="sum__page__main-list__item sum__page__main-list__item--lil">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil">Bi-folding Shutters</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil">${biFoldingShutters}</div>
        </li>

        <li class="sum__page__main-list__item sum__page__main-list__item--lil">
          <h3 class="sum__page__main-list__item__title sum__page__main-list__item__title--lil">Fixed Slats</h3>
          <div class="sum__page__main-list__item__param sum__page__main-list__item__param--lil">${fixedSlats}</div>
        </li>
      </ul>
    </div> 

    <div class="sum__page__buttons">
      <button class="sum__page__buttons__button sum__page__buttons__button--back" id="back-bt">Back To Configurator</button>
      <button class="sum__page__buttons__button sum__page__buttons__button--contact" id="contact-bt">Contact us</button>
      <button class="sum__page__buttons__button" id="dw-bt">Download PDF</button>
    </div>
  </div>
</div>
    `);

  const backButton = summaryContent.find("#back-bt");
  const contactButton = summaryContent.find("#contact-bt");
  const downloadButton = summaryContent.find("#dw-bt");

  summaryContent.find("#sum-close").on("click", () => {
    $("html, body").animate({ scrollTop: 0 }, "fast", () => {
      summaryContent.hide();
      $("body").removeClass("body-overflow-auto");
    });
  });

  backButton.on("click", () => {
    toggleLoad(true);
    $("html, body").animate({ scrollTop: 0 }, "fast", () => {
      summaryContent.hide();
      $("body").removeClass("body-overflow-auto");
    });
    toggleLoad(false);
  });

  contactButton.on("click", () => {
    loadFormData(".form-container");

    $("#sum-portal-with-comment").show();

    $("body").removeClass("body-overflow-auto");
  });

  downloadButton.on("click", async () => {
    toggleLoad(true);
    await createPDF();
    toggleLoad(false);
  });

  $(container).append(summaryContent);
}
