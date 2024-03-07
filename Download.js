class Download extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      const href = this.getAttribute('href');
      const name = this.getAttribute('name') || 'Form';
  
      if (!href) {
        console.error('<m-download> requires an href attribute.');
        return;
      }
  
      this.shadowRoot.innerHTML = `
        <style>
          a {
            text-decoration: none;
          }
        </style>
        <a href="${href}" download="${name}">
          <slot>${name}</slot>
        </a>
      `;
    }
}
  
customElements.define('m-download', Download);