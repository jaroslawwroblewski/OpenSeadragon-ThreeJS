import { ElementRef, Injectable, NgZone } from '@angular/core';
import { Scene, WebGLRenderer } from 'three';

@Injectable({ providedIn: 'root' })
export class ThreeMultipleInstanceService {
  private renderer: WebGLRenderer;
  private scenes: { [key: string]: Scene } = {};
  constructor(private ngZone: NgZone) {}

  public init(annotations: any[], canvas: HTMLCanvasElement): void {
    this.createScene();
  }

  private createScene() {}

  public render(scene): void {
    if (!scene) return;
    this.scenes[scene.uuid] = scene;
    const renderFunction = () => {
      this.renderer.clear(false, true, true);
      Object.entries(this.scenes).forEach(([key, scene]) => {
        //this.setViewport(scene.userData.element);
        this.renderer.render(scene, scene.userData.camera);
      });
    };
    this.ngZone.runOutsideAngular(() =>
      document.readyState !== 'loading'
        ? renderFunction()
        : window.addEventListener('DOMContentLoaded', renderFunction)
    );
  }
}
