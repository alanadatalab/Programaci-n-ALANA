function visualization3(vol) {
  translate(width / 2, height / 2);

  let sizeFactor = sizeSlider.value() / 50; // Factor de escala para ajustar el tamaño máximo de la flor
  let centerSize = sizeSlider.value() / 5; // Tamaño del centro de la flor, más pequeño
  let lineValue = 50 + sizeSlider.value() * vol * 10; // Aumenta el tamaño con mayor intensidad al volumen
  let strokeWeightValue = strokeSlider.value() * vol * 1; // Aumenta el grosor del trazo con el volumen
  let rotationSpeed = rotationSpeedSlider.value() * vol * 0.02; // Aumenta la velocidad de rotación con el volumen
  let strokeColor = useHSB ? color((hu + vol * 100) % 360, 255, 255) : colorPicker.color();

  strokeWeight(strokeWeightValue);

  for (let i = 0; i < 360; i += 20) {
    let currentColor = useHSB ? color((hu + i) % 360, 255, 255) : strokeColor;
    stroke(currentColor);
    push();
    rotate(radians(i + frameCount * 90 * rotationSpeed));
    beginShape();
    // Centro más pequeño de la flor
    let centerRadius = centerSize * sizeFactor;
    curveVertex(10, 80);
    // Pétalos de la flor
    for (let q = 0; q <= 40; q += 1) {
      let angle = radians(q * 400);
      let radius = centerRadius + q * lineValue * sizeFactor * vol; // Aumenta la amplitud de los pétalos con el volumen y el slider
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      curveVertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
  hu++;
}
//codigo vertex del anyways del pssssdsdfef  del medoly vista audio music viusalizawe