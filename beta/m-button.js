class MButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const partial = this.getAttribute('scale') || 1;
        const gap = this.getAttribute('gap') || '0px';
        const link = this.getAttribute('link') || 'about:blank';
        const color = this.getAttribute('color') || '#FFFFFF';
        const backgroundColor = this.getAttribute('backgroundColor') || '#000000';
        const ionIcon = this.getAttribute('ionIcon');
        const icon = this.getAttribute('icon');
        const text = this.getAttribute('text');
        const target = "_" + this.getAttribute('target') || 'blank';

        this.shadowRoot.innerHTML = `
            <style>

                .btn svg {
                    transition: all 0.3s ease;
                }
                
                .btn:hover svg {
                    filter: brightness(80%);
                    transform: scale(1.02);
                }
            </style>

            <a class="btn" href="${link}" target="${target}">
                <svg width="300" height="50" version="1.1" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(-216.32 -90.969)">
                    <path id="highlight" d="m716.32 90.969-100 100h175a25 25 0 0 0 9.5664-1.9023 25 25 0 0 0 8.1094-5.4199 25 25 0 0 0 5.4199-8.1094 25 25 0 0 0 1.9043-9.5684v-50c0-1.5177-0.18865-2.986-0.44531-4.4277a25 25 0 0 0-0.3086-1.418c-0.23856-0.99803-0.54474-1.9653-0.89843-2.9121a25 25 0 0 0-0.50977-1.3652c-0.54654-1.2362-1.1868-2.4208-1.918-3.541a25 25 0 0 0-0.93555-1.248c-0.53912-0.7224-1.1022-1.4233-1.7148-2.082a25 25 0 0 0-1.2754-1.2754c-0.65873-0.61264-1.3596-1.1757-2.082-1.7148a25 25 0 0 0-1.248-0.93555c-1.1202-0.7312-2.3048-1.3714-3.541-1.918a25 25 0 0 0-1.3711-0.51172c-0.9409-0.35123-1.9031-0.65696-2.8945-0.89453a25 25 0 0 0-1.4434-0.31445c-1.438-0.25529-2.9005-0.44141-4.4141-0.44141z"
                        style="fill:${color};paint-order:markers stroke fill;stroke-linejoin:round;stroke-width:.52917"/>
                    <text id="icon" x="651.5528" y="159.77083"
                        style="fill:${backgroundColor};font-family:Arial;font-size:53.333px;font-weight:bold;letter-spacing:0px;line-height:1.2;paint-order:markers stroke fill;stroke-linejoin:round;stroke-width:2;text-decoration-color:#000000;word-spacing:0px" xml:space="preserve">
                        <tspan x="651.5528" y="159.77083">${ionIcon ? `<foreignObject><ion-icon class="ionIcon" name="${ionIcon}"></ion-icon></foreignObject>` : icon || ''}</tspan>
                    </text>
                    <path id="right-triangle" d="m616.32 90.969v100l100-100z"
                        style="fill:${backgroundColor};paint-order:markers stroke fill;stroke-linejoin:round;stroke-width:.52917"/>
                    <path id="left-rounded" d="m241.32 90.969c-0.86562 0-1.72 0.04393-2.5625 0.12891-0.84249 0.08497-1.6731 0.21099-2.4883 0.37695-1.6304 0.33193-3.2027 0.82227-4.6992 1.4531-1.4965 0.63086-2.9185 1.404-4.248 2.3008-1.3296 0.89678-2.5676 1.9172-3.6973 3.0469-1.1297 1.1297-2.1501 2.3677-3.0469 3.6973-0.89677 1.3296-1.6699 2.7516-2.3008 4.248-0.63086 1.4965-1.1192 3.0669-1.4512 4.6973-0.16597 0.81518-0.29198 1.6458-0.37695 2.4883-0.085 0.84249-0.12891 1.6969-0.12891 2.5625v50c0 0.86562 0.0439 1.72 0.12891 2.5625 0.085 0.84249 0.21098 1.6731 0.37695 2.4883 0.33193 1.6304 0.82031 3.2027 1.4512 4.6992s1.404 2.9185 2.3008 4.248c0.89678 1.3296 1.9172 2.5676 3.0469 3.6973 1.1297 1.1297 2.3677 2.1501 3.6973 3.0469 1.3296 0.89677 2.7516 1.6699 4.248 2.3008s3.0688 1.1192 4.6992 1.4512c0.81518 0.16597 1.6458 0.29198 2.4883 0.37695 0.84249 0.085 1.6969 0.12891 2.5625 0.12891z"
                        style="fill:${backgroundColor};paint-order:markers stroke fill;stroke-linejoin:round;stroke-width:.52917"/>
                    <rect id="center-scale" x="241.32" y="90.969" width="375" height="100"
                        style="fill:${backgroundColor};stroke-linejoin:round;stroke-width:2"/>
                    <text id="button-text" x="237.41211" y="159.74478"
                        style="fill:${color};font-family:Arial;font-size:53.333px;font-weight:bold;letter-spacing:0px;line-height:1.2;paint-order:markers stroke fill;stroke-linejoin:round;stroke-width:2;text-decoration-color:#000000;word-spacing:0px" xml:space="preserve">
                        <tspan x="237.41211" y="159.74478" style="font-size:53.333px">${text}</tspan>
                    </text>
                    <path id="icon-shadow" d="m716.32 90.969-100 100h25l100-100z" style="fill-opacity:.25;fill:#000000;paint-order:markers stroke fill;stroke-linejoin:round;stroke-width:.52917"/>
                    </g>
                </svg>
            </a>
        `;

        // <foreignObject id="button-text" x="237.41211" y="100" width="300" height="50">
        //     <div style="font-size:53.333px; color:${color}; font-weight:bold; text-align:center;">
        //         <slot></slot>
        //     </div>
        // </foreignObject>

        const svg = this.shadowRoot.querySelector('svg');
        const scale = this.parentNode.getBoundingClientRect().width * partial;

        const box = this.shadowRoot.querySelector('#center-scale');
        const leftRounded = this.shadowRoot.querySelector('#left-rounded');
        const rightTriangle = this.shadowRoot.querySelector('#right-triangle');
        const highlight = this.shadowRoot.querySelector('#highlight');
        const icn = this.shadowRoot.querySelector('#icon');
        const buttonText = this.shadowRoot.querySelector('#button-text');
        const iconShadow = this.shadowRoot.querySelector('#icon-shadow');
    
        svg.width.baseVal.value = scale;
        box.style.width = scale * 2 - 225;

        // The 0.5 is to make sure the parts of the button don't have gaps
        leftRounded.setAttribute('transform', `translate(-${scale - 300.5}, 0)`);
        box.setAttribute('transform', `translate(-${scale - 300}, 0)`);
        rightTriangle.setAttribute('transform', `translate(${scale - 300.5}, 0)`);
        highlight.setAttribute('transform', `translate(${scale - 300.5}, 0)`);
        icn.setAttribute('transform', `translate(${scale - 300.5 -340}, -69) scale(1.5)`);
        buttonText.setAttribute('transform', `translate(-${scale - 300}, 0)`);
        iconShadow.setAttribute('transform', `translate(${scale - 300.5}, 0)`);
    }
}

customElements.define('m-button', MButton);