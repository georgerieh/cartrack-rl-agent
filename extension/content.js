const panel = document.createElement("div");
panel.id = "spectral-video-overlay";
panel.innerHTML = `
  <h4 style="margin:0 0 10px 0;">AI Video Spectral Analyzer</h4>
  <button id="capture-frame-btn">Analyze Paused Frame</button>
  <div class="spectral-canvases">
    <div>
      <small>Frame (Gray)</small><br>
      <canvas id="vidOriginalCanvas" width="512" height="512"></canvas>
    </div>
    <div>
      <small>FFT Spectrum</small><br>
      <canvas id="vidSpectrumCanvas" width="512" height="512"></canvas>
    </div>
  </div>
`;
document.body.appendChild(panel);

const btn = document.getElementById("capture-frame-btn");
const ctxO = document.getElementById("vidOriginalCanvas").getContext("2d");
const ctxS = document.getElementById("vidSpectrumCanvas").getContext("2d");
const size = 512;

btn.addEventListener("click", () => {
  const video = document.querySelector("video");

  if (!video) {
    alert("No active HTML5 video element found on this page.");
    return;
  }

  try {
    ctxO.drawImage(video, 0, 0, size, size);

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
  } catch (err) {
    console.error(err);
    alert(
      "CORS Security Error: This video host protects its stream from script cross-origin pixel reading.",
    );
  }
});
