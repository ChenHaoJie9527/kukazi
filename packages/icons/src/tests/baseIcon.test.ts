import { beforeEach, describe, vi, it, expect } from "vitest"
import { BaseIcon } from "../base"

vi.mock("fs", () => {
  return {
    readFileSync: vi.fn((path: string) => {
      if (path.endsWith('/json/activity-log.json')) {
        return JSON.stringify({
          "tagName": "svg",
          "type": "element",
          "attributes": {
            "xmlns": "http://www.w3.org/2000/svg",
            "width": "15",
            "height": "15",
            "fill": "none"
          },
          "children": [
            {
              "tagName": "path",
              "type": "element",
              "attributes": {
                "fill": "currentColor",
                "fill-rule": "evenodd",
                "d": "M.877 7.5a6.623 6.623 0 1 1 13.246 0 6.623 6.623 0 0 1-13.246 0M7.5 1.827a5.673 5.673 0 1 0 0 11.346 5.673 5.673 0 0 0 0-11.346M7.125 9c-.055.127-.793 2.96-.793 2.96a.5.5 0 1 1-.966-.26s.88-2.827.88-3.43V6.801l-1.958-.525a.5.5 0 1 1 .258-.966s1.654.563 2.3.563h1.309c.645 0 2.298-.563 2.298-.563a.5.5 0 1 1 .26.966l-1.966.527V8.27c0 .603.88 3.427.88 3.427a.5.5 0 0 1-.966.259S7.92 9.127 7.869 9c-.05-.127-.219-.127-.219-.127h-.307s-.173 0-.218.127M7.5 5.12a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25",
                "clip-rule": "evenodd"
              },
              "children": []
            }
          ]
        })
      }
      throw new Error(`Unexpected file: ${path}`)
    })
  }
})

vi.mock("path", () => {
  return {
    join: vi.fn((...args) => {
      return args.join('/').replace(/\/+/g, '/');
    }),
  }
})

describe("baseIcon component", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should render an SVG string', () => {
    const icon = new BaseIcon({ name: 'activity-log' });
    const result = icon.render();
    console.log('result =>', result);
    expect(result).toContain('<svg');
    expect(result).toContain('<path');
  });
})