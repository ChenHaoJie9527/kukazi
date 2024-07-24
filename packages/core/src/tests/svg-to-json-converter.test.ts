import { describe, it, expect } from "vitest"
import { svgToJsonConverter } from "../svg-to-json-converter"

describe("svgToJsonConverter", () => {
  it('should convert a svg to json correctly', () => {
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    `;

    const iconName = 'circle'
    const relativePath = 'icons/circle.svg'

    const result = svgToJsonConverter({ iconName, svgContent, relativePath })

    expect(result).toEqual({
      name: 'circle',
      path: 'icons/circle.svg',
      viewBox: '0 0 24 24',
      elements: [
        {
          tag: 'circle',
          attrs: {
            cx: 12,
            cy: 12,
            r: 10
          },
          children: []
        }
      ]
    })
  })

  it('should handle svg with nested elements', () => {
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
        </g>
      </svg>
    `;
    const iconName = 'complex-circle'
    const relativePath = 'icons/complex-circle.svg'
    const result = svgToJsonConverter({ iconName, svgContent, relativePath })

    expect(result.name).toBe('complex-circle')
    expect(result.path).toBe('icons/complex-circle.svg')
    expect(result.viewBox).toBe('0 0 24 24')
    expect(result.elements).toHaveLength(1)

    expect(result).toEqual({
      name: 'complex-circle',
      path: 'icons/complex-circle.svg',
      viewBox: '0 0 24 24',
      elements: [
        {
          tag: 'g',
          attrs: {
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': 2
          },
          children: [
            {
              tag: 'circle',
              attrs: {
                cx: 12,
                cy: 12,
                r: 10
              },
              children: []
            },
            {
              tag: 'line',
              attrs: {
                x1: 2,
                y1: 12,
                x2: 22,
                y2: 12
              },
              children: []
            }
          ]
        }
      ]
    });
  })

  it('should throw error for invalid SVG (no svg tag)', () => {
    const svgContent = '<div>Not an SVG</div>';
    const iconName = 'invalid'
    const relativePath = 'icons/invalid.svg'

    expect(() => svgToJsonConverter({ svgContent, iconName, relativePath })).toThrow("Invalid SVG: No SVG element found")
  })

  it('should throw error for SVG without viewBox', () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle></svg>';
    const iconName = 'no-viewBox'
    const relativePath = 'icons/no-viewBox.svg';

    expect(() => svgToJsonConverter({ svgContent, iconName, relativePath })).toThrow("Invalid SVG: No viewBox attribute found")
  })
})