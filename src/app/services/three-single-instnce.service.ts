import { ElementRef, Injectable } from '@angular/core';
import { Scene, OrthographicCamera, WebGLRenderer } from 'three';
import { Viewport } from '../../mocks/viewports.mock';

@Injectable({ providedIn: 'root' })
export class ThreeSingleInstanceService {
  private canvas: HTMLCanvasElement;
  private renderer: WebGLRenderer;
  private scenes: Scene[];
  private amountOfViewports: number;

  constructor() {}

  public init(amountOfViewports: number, globalCanvas: HTMLCanvasElement) {
    this.setRenderer(globalCanvas);
    this.amountOfViewports = amountOfViewports;
  }

  public updateScenes(
    annotations: any[],
    bounds,
    viewportCanvas: HTMLCanvasElement
  ) {
    const scene = this.setScene(viewportCanvas);
    this.setCamera(scene, bounds);
    this.setObjects(annotations, scene);
    this.scenes.push(scene);
    if (this.amountOfViewports === this.scenes.length) {
      this.render();
    }
  }

  public render(): void {
    const renderFunction = () => {
      this.renderer.clear(false, true, true);
      this.scenes.forEach(scene => {
        this.setViewport(scene.userData.element);
        this.renderer.render(scene, scene.userData.camera);
      });
    };

    document.readyState !== 'loading'
      ? renderFunction()
      : window.addEventListener('DOMContentLoaded', renderFunction);
  }

  private setScene(canvas: HTMLCanvasElement): Scene {
    const scene = new Scene();
    scene.userData.element = canvas;
    return scene;
  }

  private setCamera(scene: Scene, bounds): void {
    const { x, y, width, height } = bounds;
    scene.userData.camera
      ? this.updateCameraSize(scene.userData.camera, width, height)
      : (scene.userData.camera = new OrthographicCamera(
          0,
          width,
          0,
          height,
          0,
          20
        ));

    scene.userData.camera.position.set(x, y, 1);
    scene.userData.camera.clearViewOffset();
    scene.userData.camera.updateProjectionMatrix();
  }

  private updateCameraSize(
    camera: OrthographicCamera,
    width: number,
    height: number
  ): void {
    camera.right = width;
    camera.bottom = height;
  }

  private createLine(annotation: any): Line {
    const { name, color, coordinates } = annotation;
    const geometry = new BufferGeometry().setFromPoints(
      coordinates.map(([x, y]) => new Vector2(x, y))
    );

    const line = new Line(geometry, new LineBasicMaterial({ color }));

    line.name = 'line-' + name;
    line.geometry.computeBoundingBox();
    line.geometry.computeBoundingSphere();
    return line;
  }

  private setObjects(annotations: any[], scene: Scene): void {
    annotations.forEach(annotation => {
      scene.add(this.createLine(annotation));
    });
  }

  private setViewport(element): void {
    const rect = element.getBoundingClientRect();
    const canvas = this.renderer.domElement.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    const left = rect.left - canvas.left;
    const bottom = canvas.bottom - rect.bottom;
    this.renderer.setViewport(left, bottom, width, height);
    this.renderer.setScissor(left, bottom, width, height);
  }

  private setRenderer(canvas: HTMLCanvasElement): void {
    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      precision: 'highp',
      antialias: true
    });
    this.renderer.autoClear = false;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }
}
