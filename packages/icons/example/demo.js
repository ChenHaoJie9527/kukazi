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

function updateIcon() {
    const icon = new BaseIcon({
        name: 'test-icon',
        size: parseInt(30),
        color: '#fcebeb',
    });
    const result = icon.render();
    const createElement = document.createElement('div')
    createElement.innerHTML = result;
    iconContainer.appendChild(createElement);
}

updateIcon(); // 初始渲染