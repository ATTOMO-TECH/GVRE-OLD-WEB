const setBackgroundImageToContainer = (imagenURL, container) => {
  //   console.log("EL CONTENEDOR ==>", container);
  //   console.log("LA IMAGEN ==>", imagenURL);
  if (container !== undefined) {
    const domDiv = document.querySelector(container);
    // console.log(domDiv);
    if (domDiv !== null) {
      //   domDiv.style.setProperty("--background", `url('${imagenURL}')`);
      domDiv.style.backgroundImage = `url('${imagenURL}')`;
      //   domDiv.style.backgroundSize = "cover";
      //   domDiv.style.backgroundPosition = "center";
      //   domDiv.style.backgroundRepeat = "no-repeat";
      //   domDiv.style.backgroundAttachment = "fixed";
    } else {
      console.error(`Element with class '${container}' not found in the DOM.`);
    }
  } else {
    console.error("Container class not provided.");
  }
};
export default setBackgroundImageToContainer;
