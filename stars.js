/* stars.js — Fondo animado de estrellas compartido
   REDA Explorando el Sistema Solar · UNL 2026
   z-index: 0, pointer-events: none — no interfiere con clicks ni scroll */
(function () {
  'use strict';

  var STAR_COUNT = 180;

  function initStars() {
    var canvas = document.getElementById('star-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'star-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(canvas, document.body.firstChild);
    }
    canvas.style.cssText = 'position:fixed;inset:0;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var stars = [];
    var animId = null;
    var W = 0, H = 0;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildStars();
    }

    function buildStars() {
      stars = [];
      for (var i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.1 + 0.2,
          baseA: Math.random() * 0.65 + 0.15,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.35 + 0.1,
          dx: (Math.random() - 0.5) * 0.012
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      var isLight = document.body.classList.contains('reading-mode') ||
                    document.body.classList.contains('light-mode');
      if (!isLight) {
        var i, s, a;
        for (i = 0; i < stars.length; i++) {
          s = stars[i];
          a = s.baseA * (0.45 + 0.55 * Math.abs(Math.sin(t * s.speed * 0.001 + s.phase)));
          ctx.fillStyle = 'rgba(255,255,255,' + a.toFixed(3) + ')';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, 6.2832);
          ctx.fill();
          s.x += s.dx;
          if (s.x < -2) s.x = W + 2;
          if (s.x > W + 2) s.x = -2;
        }
      }
      animId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    if (animId) cancelAnimationFrame(animId);
    requestAnimationFrame(draw);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStars);
  } else {
    initStars();
  }
})();
