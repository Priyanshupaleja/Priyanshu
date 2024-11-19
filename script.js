let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevMouseX = 0;
  prevMouseY = 0;
  MouseX = 0;
  MouseY = 0;
  currentpaperX = 0;
  currentpaperY = 0;

  init(paper) {
    paper.addEventListener('mousedown', (e) => {
      if (e.button === 0) { // Check for left mouse button
        this.holdingPaper = true;

        // Set zIndex and increment highestZ
        paper.style.zIndex = highestZ;
        highestZ += 1;

        // Initialize previous mouse position to the current mouse position
        this.prevMouseX = e.clientX;
        this.prevMouseY = e.clientY;

        console.log(this.prevMouseX);
        console.log(this.prevMouseY);
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (this.holdingPaper) {
        this.MouseX = e.clientX;
        this.MouseY = e.clientY;

        // Calculate velocity
        const VelocityX = this.MouseX - this.prevMouseX;
        const VelocityY = this.MouseY - this.prevMouseY;

        // Update current paper position
        this.currentpaperX += VelocityX;
        this.currentpaperY += VelocityY;

        // Update the paper's transform style
        paper.style.transform = `translateX(${this.currentpaperX}px) translateY(${this.currentpaperY}px)`;

        // Update the previous mouse position for the next move event
        this.prevMouseX = this.MouseX;
        this.prevMouseY = this.MouseY;
      }
    });

    window.addEventListener('mouseup', (e) => {
      console.log('Mouse is released');
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
