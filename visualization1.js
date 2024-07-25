// visualization1.js
function visualization1(vol) {
    translate(width / 2, height / 2);
  

    //llamada para ser modificados los valores con los sliders
    let lineValue = sizeSlider.value() + vol * 30;
    let strokeWeightValue = strokeSlider.value();
    let rotationSpeed = rotationSpeedSlider.value();
    let strokeColor = useHSB ? color(hu % 360, 255, 255) : colorPicker.color();
  
    strokeWeight(strokeWeightValue);
  

    //angulos entre 0 y 360 con incrementos de 20 grados

    for (let i = 0; i < 360; i += 20) {
      //con cada iteración de i se cambia el color poco a poco
      let currentColor = useHSB ? color((hu + i) % 360, 255, 255) : strokeColor;
      stroke(currentColor);
      push();
      translate(0, 0);
      rotate(radians(i + frameCount * rotationSpeed));
      beginShape();

      
      for (let q = 0; q <= 20; q += 0.5) {
        let l = (sin(radians(q * 9 + frameCount)) * (5 + sin(radians(q * 9)) * (q * 3)));
        let offset = map(vol, 0, 1, 0, 50);
        let sizeFactor = sizeSlider.value() / 50; // Ajuste el tamaño máximo de la figura central
        vertex(sin(radians(0)) * (10 + q * lineValue * sizeFactor) + l + offset, (10 + q * lineValue * sizeFactor) + 20 + offset);
      }
      for (let q = 50; q >= 0; q -= 0.5) {
        let l = (sin(radians(q * 9 + frameCount)) * (5 + sin(radians(q * 9)) * (q * 3)));
        let offset = map(vol, 0, 1, 0, 50);
        let sizeFactor = sizeSlider.value() / 50; // Ajuste el tamaño máximo de la figura central
        vertex(sin(radians(0)) * (10 + q * lineValue * sizeFactor) - l - offset, (10 + q * lineValue * sizeFactor) + 10 + offset);
      }
      endShape(CLOSE);
      pop();
    }
    hu++;
  }
  