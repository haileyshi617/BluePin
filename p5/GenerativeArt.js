const p5 = require('p5');

// Ref: https://medium.com/js-dojo/experiment-with-p5-js-on-vue-7ebc05030d33

let degree;
let N;

let rad = 50;
let speed = 0.1;

let size;

export default class GenerativeArt {
  constructor(canvasWidth, canvasHeight, tripInfo, div) {
    new p5(function (p5) {
      p5.setup = function () {
        p5.createCanvas(canvasWidth, canvasHeight);
        p5.background(146, 176, 255);
        rad = 0;
      };

      p5.draw = function () {
        if (tripInfo.type != 'Trip') {
          if (tripInfo.type == 'Events: Winter Vibe') {
            p5.background(255, 200, 100, 30);
          } else if (tripInfo.type == 'Events: Green Divide Annual Challenge') {
            p5.background(100, 255, 130, 10);
          } else {
            p5.background(142, 12, 51, 10);
          }
        } else {
          if (tripInfo.end == 'Harvard') {
            p5.background(100, 0, 0, 10);
          } else if (tripInfo.end == 'MIT') {
            p5.background(0, 57, 100, 10);
          } else {
            p5.background(0, 10);
          }
        }

        degree = p5.floor(360 / (tripInfo.distance + 2));
        N = p5.map(tripInfo.distance, 0, 10, 2, 8);
        size = p5.frameCount % p5.map(tripInfo.distance, 0, 10, 1, 20);

        p5.background(0, 10);
        p5.push();
        p5.translate(p5.width / 2, p5.height / 2);
        p5.noFill();
        p5.stroke(255);
        for (var i = 0, step = 0; i < 360 * N; i += degree, step += 1) {
          if (canvasHeight == 310) {
            const angle = p5.radians(i);
            var x = (rad + step) * p5.cos(angle);
            var y = (rad + step) * p5.sin(angle);
            var r = p5.map(i, 0, 360 * N, 0, 255);

            if (tripInfo.type != 'Trip') {
              // p5.stroke(r);
              if (tripInfo.type == 'Events: Winter Vibe') {
                p5.stroke(255, 240, 100, p5.random(255));
              } else if (
                tripInfo.type == 'Events: Green Divide Annual Challenge'
              ) {
                p5.stroke(160, 200, 180, p5.random(255));
              } else {
                p5.stroke(200, 100, 160, p5.random(255));
              }
              p5.rotate(2);
              p5.strokeWeight(r / 20);
              p5.point(x + r / 10, y + r / 10, 10);
              p5.point(x, y, 10, 10);
              p5.line(x, y, x + r / 255, y + r / 255);
            } else {
              p5.stroke(r);
              p5.rotate(1);
              p5.rect(x, y, 10, 10);
              p5.line(x, y, x + r / 255, y + r / 255);
              p5.square(x + r / 255, y + r / 255, 10);
              if (tripInfo.end == 'Harvard') {
                p5.stroke(200, 100, 100, p5.random(255));
              } else if (tripInfo.end == 'MIT') {
                p5.stroke(100, 100, 200, p5.random(255));
              } else {
                p5.stroke(255, p5.random(255));
              }
              if (p5.random() > 0.95) {
                p5.line(0, 0, x, y);
              }
            }
          } else {
            const angle = p5.radians(i);
            x = (rad + step) * (p5.cos(angle) + p5.random(angle));
            y = (rad + step) * (p5.sin(angle) + p5.random(angle));
            r = p5.map(i, 0, 360 * N, 0, 30);

            if (tripInfo.type != 'Trip') {
              if (tripInfo.type == 'Events: Winter Vibe') {
                p5.stroke(255, 178, 100, p5.random(255));
              } else if (
                tripInfo.type == 'Events: Green Divide Annual Challenge'
              ) {
                p5.stroke(140, 200, 160, p5.random(255));
              } else {
                p5.stroke(200, 80, 100, p5.random(255));
              }
            } else {
              if (tripInfo.end == 'Harvard') {
                p5.stroke(200, 100, 100, p5.random(255));
              } else if (tripInfo.end == 'MIT') {
                p5.stroke(100, 100, 200, p5.random(255));
              } else {
                p5.stroke(255, p5.random(255));
              }
            }
            p5.triangle(x, y, x + r, y + r, x - r, y - r);
            p5.strokeWeight(size);
            p5.point(x, y);
          }
        }
        p5.pop();
        rad += speed;
        if (rad > 100 || rad < -100) {
          speed *= -1;
        }
      };
    }, div);
  }
}
