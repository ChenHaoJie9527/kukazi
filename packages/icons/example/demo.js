import { iconsData } from './icon-data.js';

class BaseIcon {
    constructor(props) {
        this.props = props;
        this.metadata = this.loadMetadata(props.name);
    }

    loadMetadata(name) {
        return iconsData[name];
    }

    render() {
        const svg = this.applyProps(this.metadata);
        return this.generateSvg(svg);
    }

    applyProps(element) {
        const newElement = { ...element };
        console.log('newElement =>', newElement.attributes);
        if (this.props.size) {
            newElement.attributes.width = this.props.size;
            newElement.attributes.height = this.props.size;
        }

        if (this.props.color) {
            this.applyColorRecursively(newElement);
        }

        if (this.props.rotate) {
            newElement.attributes.transform = `rotate(${this.props.rotate})`;
        }

        newElement.children = newElement.children?.map(child => this.applyProps(child)) ?? [];

        return newElement;
    }

    applyColorRecursively(element) {
        if (element.attributes && element.attributes.fill === 'currentColor') {
            element.attributes.fill = this.props.color;
        }
        element.children?.forEach(child => this.applyColorRecursively(child));
    }

    generateSvg(element) {
        const attributes = Object.entries(element.attributes)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ');
        const children = element.children
            ?.map(child => this.generateSvg(child))
            .join('') ?? '';
        return `<${element.tagName} ${attributes}>${children}</${element.tagName}>`;
    }
}

const iconContainer = document.getElementById('icon-container');
const iconSelect = document.getElementById('icon-select');
const colorPicker = document.getElementById('color-picker');
const sizeInput = document.getElementById('size-input');
const rotateInput = document.getElementById('rotate-input');

function updateIcon() {
    const icon = new BaseIcon({
        name: iconSelect.value,
        size: parseInt(sizeInput.value),
        color: colorPicker.value,
        rotate: parseInt(rotateInput.value)
    });
    console.log(icon);
    iconContainer.innerHTML = icon.render();
}

[iconSelect, colorPicker, sizeInput, rotateInput].forEach(el => 
    el.addEventListener('change', updateIcon)
);

updateIcon(); // 初始渲染