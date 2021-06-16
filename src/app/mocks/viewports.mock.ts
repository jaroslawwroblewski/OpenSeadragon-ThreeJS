const AMOUNT_OF_VIEWPORTS = 6;
const AMOUNT_OF_ANNOTATIONS = 100;
const CIRCLE_SIZE = 200;
const COLORS = [0x00ff00, 0xe50d9c, 0x2247c2, 0xffff00];

export interface Viewport {
  id: string;
  annotations: any[];
}

const circle = (
  radius: number,
  steps: number,
  centerX: number,
  centerY: number
) => {
  let vertArray = [];
  for (let i = 1; i < steps; i++) {
    vertArray.push([
      centerX + radius * Math.cos(((Math.PI * i) / steps) * 2 - Math.PI / 2),
      centerY + radius * Math.sin(((Math.PI * i) / steps) * 2 - Math.PI / 2)
    ]);
  }
  return vertArray;
};

const generateCircularAnnotations = (
  amountOfCircles: number,
  amountOfgeometry: number,
  range: number
) => {
  const annotations = [];
  for (let i = 0; i < amountOfCircles; i++) {
    annotations.push({
      name: Math.random()
        .toString(36)
        .substr(2, 9),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      coordinates: circle(
        amountOfgeometry,
        amountOfgeometry,
        Math.floor(Math.random() * range),
        Math.floor(Math.random() * range)
      )
    });
  }
  return annotations;
};

const generateViewports = (): Viewport[] => {
  const viewport = [];
  for (let i = 0; i < AMOUNT_OF_VIEWPORTS; i++) {
    viewport.push({
      id: Math.random()
        .toString(36)
        .substr(2, 9),
      annotations: generateCircularAnnotations(
        AMOUNT_OF_ANNOTATIONS,
        CIRCLE_SIZE,
        13000
      )
    });
  }
  return viewport;
};

export const mockViewports: Viewport[] = generateViewports();
