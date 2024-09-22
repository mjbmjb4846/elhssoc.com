class SpinButton extends HTMLElement {
    /**
     * Creates an instance of SpinButton.
     *
     * @constructor
     */
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    /**
     * Called when the element is added to the DOM.
     *
     * @method connectedCallback
     */
    connectedCallback() {
      this.render();
    }
  
    /**
     * Renders the spin button with the provided attributes.
     *
     * @method render
     */
    render() {
      const link = this.getAttribute('link') || "about:blank";
      const color = this.getAttribute('color');
      const ionIcon = this.getAttribute('ionIcon');
      const text = this.getAttribute('text');
      const target = "_" + (this.getAttribute('target') || 'blank');
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
          }
          .button {
            display: flex;
            height: 50px;
            width: 100%;
            outline: none;
            background-color: var(--color-light);
            border-radius: 5px;
            font-size: 20px;
            align-items: center;
            text-decoration: none;
            overflow: hidden;
            transition: all 0.1s ease;
          }
          .button .boxText {
            flex: 1;
            padding-left: 5%;
            color: var(--text);
            font-family: 'Lato', sans-serif;
            font-weight: 750;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .button:hover {
            transform: scale(1.05);
            filter: brightness(95%);
          }
          .button .boxIcon {
            position: relative;
            width: 80px;
            height: 100%;
            color: var(--color-light);
            background-color: var(--black);
            display: flex;
            align-items: center;
            justify-content: flex-end;
            clip-path: polygon(40px 0, 100% 0, 100% 100%, 0% 100%);
            overflow: hidden;
          }
          .button .boxIcon ion-icon {
            font-size: 50px;
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
          }
          .button:hover .ionIcon {
            animation: rotate 0.6s ease-in-out;
          }
          @keyframes rotate {
            from { transform: translateY(-50%) rotate(0deg); }
            to { transform: translateY(-50%) rotate(360deg); }
          }
        </style>
        <a class="button" target="${target}">
          <span class="boxText"></span>
          <span class="boxIcon">
            <ion-icon class="ionIcon"></ion-icon>
          </span>
        </a>
      `;
  
      const button = this.shadowRoot.querySelector('.button');
      const boxText = this.shadowRoot.querySelector('.boxText');
      const boxIcon = this.shadowRoot.querySelector('.boxIcon');
      const ionIconElement = this.shadowRoot.querySelector('.ionIcon');
  
      button.href = link;
      boxText.textContent = text;
      boxText.style.color = color;
      boxIcon.style.backgroundColor = color;
  
      if (ionIcon) {
        ionIconElement.name = ionIcon;
      } else {
        ionIconElement.style.display = 'none';
      }
    }
  }
  
  customElements.define('m-button', SpinButton);  