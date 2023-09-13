// ParticleAnimation.js
import "./Animation.css";
import { useEffect } from "react";

function ParticleAnimation() {
  useEffect(() => {
    let WIDTH;
    let HEIGHT;
    let canvas;
    let con;
    let pxs = [];
    const rint = 60;

    function draw() {
      con.clearRect(0, 0, WIDTH, HEIGHT);
      for (let e = 0; e < pxs.length; e++) {
        pxs[e].fade();
        pxs[e].move();
        pxs[e].draw();
      }
    }

    function Circle() {
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight;
      this.s = {
        ttl: 8000,
        xmax: 5,
        ymax: 2,
        rmax: 10,
        rt: 1,
        xdef: 960,
        ydef: 540,
        xdrift: 4,
        ydrift: 4,
        random: true,
        blink: true,
      };
      this.reset = function () {
        this.x = this.s.random ? WIDTH * Math.random() : this.s.xdef;
        this.y = this.s.random ? HEIGHT * Math.random() : this.s.ydef;
        this.r = (this.s.rmax - 1) * Math.random() + 1;
        this.dx = Math.random() * this.s.xmax * (Math.random() < 0.5 ? -1 : 1);
        this.dy = Math.random() * this.s.ymax * (Math.random() < 0.5 ? -1 : 1);
        this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
        this.rt = Math.random() * this.hl;
        this.s.rt = Math.random() + 1;
        this.stop = Math.random() * 0.2 + 0.4;
        this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
        this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
      };
      this.fade = function () {
        this.rt += this.s.rt;
      };
      this.draw = function () {
        if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl))
          this.s.rt = this.s.rt * -1;
        else if (this.rt >= this.hl) this.reset();
        const e = 1 - this.rt / this.hl;
        con.beginPath();
        con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        con.closePath();
        const t = this.r * e;
        const g = con.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          t <= 0 ? 1 : t
        );
        g.addColorStop(0, "rgba(255,255,255," + e + ")");
        g.addColorStop(this.stop, "rgba(77,101,181," + e * 0.6 + ")");
        g.addColorStop(1, "rgba(77,101,181,0)");
        con.fillStyle = g;
        con.fill();
      };
      this.move = function () {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        this.x += (this.rt / this.hl) * this.dx;
        this.y += (this.rt / this.hl) * this.dy;
        if (this.x > WIDTH || this.x < 0) this.dx *= -1;
        if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
      };
      this.getX = function () {
        return this.x;
      };
      this.getY = function () {
        return this.y;
      };
    }

    // Initialize canvas and particles
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    canvas = document.getElementById("pixie");
    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);
    con = canvas.getContext("2d");
    for (let e = 0; e < 100; e++) {
      pxs[e] = new Circle();
      pxs[e].reset();
    }

    // Start animation loop
    setInterval(draw, rint);

    // Cleanup function (equivalent to componentWillUnmount)
    return () => {
      // Clear any resources or intervals if needed
    };
  }, []); // Run the effect only once when the component mounts

  return (
    <div>
      <canvas id="pixie"></canvas>
      <div className="container"></div>
    </div>
  );
}

export default ParticleAnimation;
