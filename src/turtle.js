export function createTurtle(canvas, rotationAngle, segmentLength) {
  return {
    context: canvas,
    commencer: function () {
      this.x = 0;
      this.y = 0;
      this.angle = 0;
      this.minX = 0;
      this.minY = 0;
      this.branchStack = [];
      this.callStack = [];

      // Reset current transformation matrix to the identity matrix
      this.context.setTransform(1, 0, 0, 1, 0, 0);

      this.callStack.push(() => this.context.moveTo(this.x, this.y));

      this.context.lineWidth = 2;
      this.context.strokeStyle = "red";
    },
    avancer: function () {
      this.x += segmentLength * Math.sin(this.angle);
      this.y += segmentLength * Math.cos(this.angle);

      this.minX = this.x < this.minX ? this.x : this.minX;
      this.minY = this.y < this.minY ? this.y : this.minY;

      const x = this.x;
      const y = this.y;
      this.callStack.push(() => {
        console.log(`lineto ${x} ${y}`);
        this.context.lineTo(x, y);
      });
    },
    tournerGauche: function () {
      this.angle += rotationAngle;
    },
    tournerDroite: function () {
      this.angle -= rotationAngle;
    },
    sauvegarderPosition: function () {
      this.branchStack.push({
        x: this.x,
        y: this.y,
        angle: this.angle,
      });
    },
    chargerPosition: function () {
      let state = this.branchStack.pop();
      this.x = state.x;
      this.y = state.y;
      this.angle = state.angle;
      this.callStack.push(() => this.context.moveTo(this.x, this.y));
    },
    dessiner: function (x = 0, y = 0, scale = 1) {
      this.context.setTransform(1, 0, 0, 1, 0, 0);
      this.context.clearRect(
        0,
        0,
        this.context.canvas.width,
        this.context.canvas.height
      );

      this.context.translate(-this.minX + 10 + x, -this.minY + 10 + y);
      this.context.scale(scale, scale);

      this.context.beginPath();
      for (let i = 0; i < this.callStack.length; i++) {
        this.callStack[i]();
        console.log(i);
      }
      this.context.stroke();

      console.log(`${-this.minX + 10}, ${-this.minY + 10}`);
      console.log("Terminé");
    },
  };
}