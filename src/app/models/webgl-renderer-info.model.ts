export interface WebGLRendererInfo {
  viewportId: string | number;
  renderTime: number;
  memory: {
    geometries: number;
    textures: number;
  };
  render: {
    calls: number;
    points: number;
    vertices: number;
    faces: number;
    lines: number;
    triangles: number;
    frame: number;
  };
  programs: number;
}
