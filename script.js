document.addEventListener("DOMContentLoaded", () => {
    const bubbles = document.querySelectorAll(".bubble");
    const container = document.querySelector(".bubble-container");
  
    const bubbleData = Array.from(bubbles).map((bubble) => {
      return {
        el: bubble,
        x: Math.random() * (container.clientWidth - bubble.offsetWidth),
        y: Math.random() * (container.clientHeight - bubble.offsetHeight),
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
      };
    });
  
    function animate() {
      bubbleData.forEach((b) => {
        b.x += b.dx;
        b.y += b.dy;
  
        if (b.x <= 0 || b.x + b.el.offsetWidth >= container.clientWidth) b.dx *= -1;
        if (b.y <= 0 || b.y + b.el.offsetHeight >= container.clientHeight) b.dy *= -1;
  
        b.el.style.left = b.x + "px";
        b.el.style.top = b.y + "px";
      });
  
      requestAnimationFrame(animate);
    }
  
    animate();
  });
  