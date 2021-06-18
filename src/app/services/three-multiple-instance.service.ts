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
import { cloneDeep } from 'lodash';
import { PerformanceMetricService } from './performance-metric.service';

@Injectable()
export class ThreeMultipleInstanceService {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: OrthographicCamera;

  constructor(private performanceMetricService: PerformanceMetricService) {}

  public init(
    annotations: any[],
    canvas: HTMLCanvasElement,
    bounds: any,
    viewportId: string
  ): void {
    this.setScene(viewportId);
    this.setCamera(bounds);
    this.setRenderer(canvas);
    this.setObjects(annotations);
  }

  public render(): void {
    const renderFunction = () => {
      const startTime = Date.now();
      // start rendering
      this.renderer.render(this.scene, this.camera);
      // rendering performance measurement
        this.performanceMetricService.addNewMetric({
          viewportId: this.scene.userData.viewportId,
          renderTime: Date.now() - startTime,
          ...cloneDeep(this.renderer.info)
        });
    };
    document.readyState !== 'loading'
      ? renderFunction()
      : window.addEventListener('DOMContentLoaded', renderFunction);
  }

  private setScene(viewportId: string): void {
    this.scene = new Scene();
    this.scene.userData.viewportId = viewportId;
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
    this.renderer.autoClear = true;
    this.renderer.setPixelRatio(2);
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

  private setObjects(annotations: any[]): void {
    annotations.forEach(annotation => {
      this.scene.add(this.createLine(annotation));
    });
    this.render();
  }
}
