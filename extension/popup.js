const ctxO = document.getElementById("originalCanvas").getContext("2d");
const ctxS = document.getElementById("spectrumCanvas").getContext("2d");
const size = 512;

chrome.storage.local.get("targetImageUrl", (data) => {
  if (!data.targetImageUrl) return;

  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = data.targetImageUrl;

  img.onload = () => {
    ctxO.drawImage(img, 0, 0, size, size);
    const imgData = ctxO.getImageData(0, 0, size, size);
    const grayData = [];

    for (let i = 0; i < imgData.data.length; i += 4) {
      const gray =
        imgData.data[i] * 0.299 +
        imgData.data[i + 1] * 0.587 +
        imgData.data[i + 2] * 0.114;
      imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = gray;
      grayData.push(gray);
    }
    ctxO.putImageData(imgData, 0, 0);

    const spectrum = performFFT2D(grayData, size);

    const output = ctxS.createImageData(size, size);
    for (let i = 0; i < spectrum.length; i++) {
      let val = 20 * Math.log(spectrum[i] + 1);
      val = Math.min(255, Math.max(0, val));

      output.data[i * 4] = val;
      output.data[i * 4 + 1] = val;
      output.data[i * 4 + 2] = val;
      output.data[i * 4 + 3] = 255;
    }
    ctxS.putImageData(output, 0, 0);
  };

  img.onerror = () => {
    alert(
      "Could not analyze image. The website's security policies (CORS) blocked direct canvas access.",
    );
  };
});
