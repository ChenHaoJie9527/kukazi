import { beforeEach, describe, vi, it, expect } from "vitest"
import { BaseIcon } from "../base"
import { readFileSync } from "fs"
import { join } from 'path';

vi.mock("fs", () => {
  return {
    readFileSync: vi.fn(() => JSON.stringify({
      tagName: 'svg',
      attributes: {
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
      },
      children: [{
        tagName: 'path',
        attributes: {
          d: 'M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z',
          fill: '#212121'
        }
      }]
    }))
  }
})

vi.mock("path", () => {
  return {
    join: vi.fn((...args) => args.join('/'))
  }
})

describe("baseIcon component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should render an SVG string', () => {
    const icon = new BaseIcon({ name: 'test-icon' });
    const result = icon.render();
    expect(result).toContain('<svg');
    expect(result).toContain('<path');
  });
})