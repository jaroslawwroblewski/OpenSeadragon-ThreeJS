import { ElementRef, Injectable, NgZone } from '@angular/core';
import { Scene, OrthographicCamera, WebGLRenderer } from 'three';

@Injectable({ providedIn: 'root' })
export class ThreeMultipleInstanceService {
  private renderer: WebGLRenderer;
  private camera: OrthographicCamera;

  constructor(private ngZone: NgZone) {}

  public init(
    annotations: any[],
    canvas: HTMLCanvasElement,
    bounds: any
  ): void {
    const scene = new Scene();
    this.setCamera(bounds);
  }

  private setCamera(bounds) {
    const { x, y, width, height } = bounds;
    this.camera
      ? this.updateCameraSize(this.camera, width, height)
      : (this.camera = new OrthographicCamera(
          0,
          width,
          0,
          height,
          0,
          20
        ));

    this.camera.position.set(x, y, 1);
    this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();
  }

  private updateCameraSize(
    camera: OrthographicCamera,
    width: number,
    height: number
  ): void {
    camera.right = width;
    camera.bottom = height;
  }

  // public render(scene): void {
  //   if (!scene) return;
  //   this.scenes[scene.uuid] = scene;
  //   const renderFunction = () => {
  //     this.renderer.clear(false, true, true);
  //     Object.entries(this.scenes).forEach(([key, scene]) => {
  //       //this.setViewport(scene.userData.element);
  //       this.renderer.render(scene, scene.userData.camera);
  //     });
  //   };
  //   this.ngZone.runOutsideAngular(() =>
  //     document.readyState !== 'loading'
  //       ? renderFunction()
  //       : window.addEventListener('DOMContentLoaded', renderFunction)
  //   );
  // }
}
