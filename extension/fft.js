function performFFT2D(grayData, size) {
  const N = size;

  let re = new Float64Array(N * N);
  let im = new Float64Array(N * N);

  for (let i = 0; i < grayData.length; i++) {
    re[i] = grayData[i];
  }

  for (let r = 0; r < N; r++) {
    let rowRe = new Float64Array(N);
    let rowIm = new Float64Array(N);
    for (let c = 0; c < N; c++) {
      rowRe[c] = re[r * N + c];
      rowIm[c] = im[r * N + c];
    }
    fft1D(rowRe, rowIm);
    for (let c = 0; c < N; c++) {
      re[r * N + c] = rowRe[c];
      im[r * N + c] = rowIm[c];
    }
  }

  for (let c = 0; c < N; c++) {
    let colRe = new Float64Array(N);
    let colIm = new Float64Array(N);
    for (let r = 0; r < N; r++) {
      colRe[r] = re[r * N + c];
      colIm[r] = im[r * N + c];
    }
    fft1D(colRe, colIm);
    for (let r = 0; r < N; r++) {
      re[r * N + c] = colRe[r];
      im[r * N + c] = colIm[r];
    }
  }

  const spectrum = new Float64Array(N * N);
  const half = N / 2;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      let targetR = (r + half) % N;
      let targetC = (c + half) % N;

      let idx = r * N + c;
      let targetIdx = targetR * N + targetC;

      let mag = Math.sqrt(re[idx] * re[idx] + im[idx] * im[idx]);
      spectrum[targetIdx] = mag;
    }
  }

  return spectrum;
}

function fft1D(re, im) {
  const n = re.length;
  if (n <= 1) return;

  for (let i = 0, j = 0; i < n; i++) {
    if (i < j) {
      let tempRe = re[i];
      re[i] = re[j];
      re[j] = tempRe;
      let tempIm = im[i];
      im[i] = im[j];
      im[j] = tempIm;
    }
    let bit = n >> 1;
    while (j & bit) {
      j ^= bit;
      bit >>= 1;
    }
    j ^= bit;
  }

  for (let len = 2; len <= n; len <<= 1) {
    let ang = ((2 * Math.PI) / len) * -1;
    let wlenRe = Math.cos(ang);
    let wlenIm = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let wRe = 1.0;
      let wIm = 0.0;
      for (let j = 0; j < len / 2; j++) {
        let uIdx = i + j;
        let vIdx = i + j + len / 2;
        let tRe = re[vIdx] * wRe - im[vIdx] * wIm;
        let tIm = re[vIdx] * wIm + im[vIdx] * wRe;
        re[vIdx] = re[uIdx] - tRe;
        im[vIdx] = im[uIdx] - tIm;
        re[uIdx] += tRe;
        im[uIdx] += tIm;

        let next_wRe = wRe * wlenRe - wIm * wlenIm;
        wIm = wRe * wlenIm + wIm * wlenRe;
        wRe = next_wRe;
      }
    }
  }
}
