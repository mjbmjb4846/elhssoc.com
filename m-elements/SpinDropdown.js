class SpinDropdown extends HTMLElement {
    /**
     * Creates an instance of SpinDropdown.
     *
     * @constructor
     */
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.isOpen = false;
      this.closeDropdown = this.closeDropdown.bind(this);
    }
  
    /**
     * Called when the element is added to the DOM.
     *
     * @method connectedCallback
     */
    connectedCallback() {
      this.render();
      this.button = this.shadowRoot.querySelector('.button');
      this.content = this.shadowRoot.querySelector('.content');
      this.button.addEventListener('click', this.toggleDropdown.bind(this));
      document.addEventListener('click', this.handleDocumentClick.bind(this));
    }
  
    /**
     * Called when the element is removed from the DOM.
     *
     * @method disconnectedCallback
     */
    disconnectedCallback() {
      document.removeEventListener('click', this.handleDocumentClick.bind(this));
    }
  
    /**
     * Renders the dropdown with the provided attributes.
     *
     * @method render
     */
    render() {
      const text = this.getAttribute('text') || 'Dropdown';
      const color = this.getAttribute('color') || 'var(--color-light)';
      const highlight = this.getAttribute('highlight') || 'var(--white)';
      const ionIcon = this.getAttribute('ionIcon') || "arrow-down-circle";
      const content = this.getAttribute('content') || '';
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            font-family: 'Lato', sans-serif;
          }
          .button {
            display: flex;
            height: 50px;
            width: 100%;
            background-color: ${color};
            border-radius: 5px;
            font-size: 20px;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease, border-radius 0.3s ease;
          }
          .button:hover {
            filter: brightness(70%);
          }
          .button.open {
            border-radius: 5px 5px 0 0;
          }
          .button.open:hover {
            filter: brightness(100%);
          }
          .boxText {
            flex: 1;
            padding-left: 5%;
            color: ${highlight};
            font-weight: 750;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .boxIcon {
            position: relative;
            width: 80px;
            height: 100%;
            background-color: ${highlight};
            display: flex;
            align-items: center;
            justify-content: flex-end;
            clip-path: polygon(40px 0, 100% 0, 100% 100%, 0% 100%);
            overflow: hidden;
          }
          .boxIcon ion-icon {
            font-size: 50px;
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
            color: ${color};
            transition: transform 0.3s ease;
          }
          .content {
            background-color: ${highlight};
            border-radius: 0 0 5px 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            padding: 0 20px;
            font-size: 16px;
            color: ${color};
          }
          .content.show {
            max-height: 500px;
            opacity: 1;
            padding: 20px;
            border: 1px solid #ccc;
            border-top: none;
          }
          .button.open .boxIcon ion-icon {
            transform: translateY(-50%) rotate(180deg);
          }
        </style>
        <div class="button">
          <span class="boxText">${text}</span>
          <span class="boxIcon">
            <ion-icon name="${ionIcon}"></ion-icon>
          </span>
        </div>
        <div class="content">
          ${content}
          <slot></slot>
        </div>
      `;
    }
  
    /**
     * Toggles the dropdown open or closed.
     *
     * @param {Event} event - The event object.
     * @method toggleDropdown
     */
    toggleDropdown(event) {
      event.stopPropagation();
      if (this.isOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    }
  
    /**
     * Opens the dropdown.
     *
     * @method openDropdown
     */
    openDropdown() {
      this.isOpen = true;
      this.content.classList.add('show');
      this.button.classList.add('open');
    }
  
    /**
     * Closes the dropdown.
     *
     * @method closeDropdown
     */
    closeDropdown() {
      this.isOpen = false;
      this.content.classList.remove('show');
      this.button.classList.remove('open');
    }
  
    /**
     * Handles clicks outside the dropdown to close it.
     *
     * @param {Event} event - The event object.
     * @method handleDocumentClick
     */
    handleDocumentClick(event) {
      const isClickInside = this.contains(event.target);
      if (!isClickInside && this.isOpen) {
        this.closeDropdown();
      }
    }
  }
  
  customElements.define('m-drop', SpinDropdown);  