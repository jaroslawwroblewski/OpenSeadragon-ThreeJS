const AMOUNT_OF_VIEWPORTS = 4;
const AMOUNT_OF_ANNOTATIONS = 100;
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
    const x =
      centerX + radius * Math.cos(((Math.PI * i) / steps) * 2 - Math.PI / 2);
    const y =
      centerY + radius * Math.sin(((Math.PI * i) / steps) * 2 - Math.PI / 2);
    vertArray.push([x, y]);
  }
  return vertArray;
};

const generateCircularAnnotations = (
  amountOfCircles: number,
  amountOfgeometry: number,
  range: number
) => {
  let annotations = [];
  for (let i = 0; i < amountOfCircles; i++) {
    let centerX = Math.floor(Math.random() * range);
    let centerY = Math.floor(Math.random() * range);
    let color = COLORS[Math.floor(Math.random() * COLORS.length)];
    annotations.push({
      name: Math.random()
        .toString(36)
        .substr(2, 9),
      color,
      coordinates: circle(amountOfgeometry, amountOfgeometry, centerX, centerY)
    });
  }
  return annotations;
};

const generateViewports = () => {
  const viewport = [];
  for (let i = 0; i < AMOUNT_OF_VIEWPORTS; i++) {
    viewport.push({
      id: Math.random()
        .toString(36)
        .substr(2, 9),
      annotations: generateCircularAnnotations(
        AMOUNT_OF_ANNOTATIONS,
        200,
        13000
      )
    });
  }
  return viewport;
};

export const mockViewports: Viewport[] = generateViewports();

// MODEL:
// {
//     id: '093g346',
//     annotations: [
//       {
//         name: 'eefsdfgsdf6',
//         color: 0x00ff00,
//         coordinates: [
//           [12000, 7000],
//           [3000, 4000],
//           [0, 0],
//           [13000, 13000],
//           [500, 6000],
//           [4500, 11000]
//         ]
//       }
//     ]
//   }
