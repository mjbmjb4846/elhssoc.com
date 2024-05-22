class Carousel extends HTMLElement {
    /**
 * Creates an instance of Carousel Custom HTML Component.
 *
 * @constructor
 */
constructor() {
      super();
      this.images = [];
      this.currentIndex = 0;
    }
  
    /**
 * ${1:Description placeholder}
 */
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
  
    /**
 * ${1:Description placeholder}
 */
showNextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.showImage();
    }
  
    /**
 * ${1:Description placeholder}
 */
showPrevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.showImage();
    }
  
    /**
 * ${1:Description placeholder}
 *
 * @static
 * @readonly
 * @type {{}\}
 */
static get observedAttributes() {
      return ['images', 'width', 'height'];
    }
  
    /**
 * ${1:Description placeholder}
 *
 * @param {*} name
 * @param {*} oldValue
 * @param {*} newValue
 */
attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'images') {
        this.images = JSON.parse(newValue);
        this.showImage();
      }
    }
  }
  
  customElements.define('m-carousel', Carousel);  