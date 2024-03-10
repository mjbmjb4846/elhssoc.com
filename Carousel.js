class MCarousel extends HTMLElement {
    constructor() {
      super();
      this.images = [];
      this.currentIndex = 0;
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div class="carousel-container">
          <img id="carousel-image" src="">
          <button id="prev-button">Previous</button>
          <button id="next-button">Next</button>
        </div>
      `;
  
      this.prevButton = this.querySelector('#prev-button');
      this.nextButton = this.querySelector('#next-button');
      this.carouselImage = this.querySelector('#carousel-image');
  
      this.prevButton.addEventListener('click', () => this.showPrevImage());
      this.nextButton.addEventListener('click', () => this.showNextImage());
  
      this.showImage();
    }
  
    showImage() {
      this.carouselImage.src = this.images[this.currentIndex];
      this.carouselImage.style.objectFit = 'cover';
      this.carouselImage.style.width = this.getAttribute('width') || '100%';
      this.carouselImage.style.height = this.getAttribute('height') || '100%';
    }
  
    showNextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.showImage();
    }
  
    showPrevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.showImage();
    }
  
    static get observedAttributes() {
      return ['images', 'width', 'height'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'images') {
        this.images = JSON.parse(newValue);
        this.showImage();
      }
    }
  }
  
  customElements.define('m-carousel', MCarousel);  