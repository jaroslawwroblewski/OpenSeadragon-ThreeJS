import { ElementRef, Injectable } from '@angular/core';
import {
  BufferGeometry,
  Scene,
  Line,
  LineBasicMaterial,
  OrthographicCamera,
  Vector2,
  WebGLRenderer
} from 'three';

@Injectable({ providedIn: 'root' })
export class ThreeMultipleInstanceService {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: OrthographicCamera;

  constructor() {}

  public init(
    annotations: any[],
    canvas: HTMLCanvasElement,
    bounds: any
  ): void {
    this.setScene();
    this.setCamera(bounds);
    this.setRenderer(canvas);
    this.createObjects(annotations);
  }

  public render(): void {
    const renderFunction = () => {
      console.log(this.scene);
      //this.renderer.clear(false, true, true);
      this.renderer.render(this.scene, this.camera);
    };
    document.readyState !== 'loading'
      ? renderFunction()
      : window.addEventListener('DOMContentLoaded', renderFunction);
  }

  private setScene(): void {
    this.scene = new Scene();
  }

  private setCamera(bounds): void {
    const { x, y, width, height } = bounds;
    this.camera
      ? this.updateCameraSize(this.camera, width, height)
      : (this.camera = new OrthographicCamera(0, width, 0, height, 0, 20));

    this.camera.position.set(x, y, 1);
    this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();
  }

  private setRenderer(canvas: HTMLCanvasElement): void {
    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      precision: 'highp',
      antialias: true
    });
  }

  private updateCameraSize(
    camera: OrthographicCamera,
    width: number,
    height: number
  ): void {
    camera.right = width;
    camera.bottom = height;
  }

  private createObjects(annotations: any[]): void {
    const geometry = new BufferGeometry().setFromPoints(
      annotations.map(([x, y]) => new Vector2(x, y))
    );

    const line: Line = new Line(
      geometry,
      new LineBasicMaterial({ color: 0x00ff00 })
    );

    line.geometry.computeBoundingBox();
    line.geometry.computeBoundingSphere();
    this.scene.add(line);
    this.render();
  }
}
