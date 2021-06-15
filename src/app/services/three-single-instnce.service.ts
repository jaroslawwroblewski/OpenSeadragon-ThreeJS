import { ElementRef, Injectable, NgZone } from "@angular/core";
import { Scene, WebGLRenderer } from "three";

@Injectable({ providedIn: "root" })
export class ThreeSingleInstanceService {
  private canvas: ElementRef<HTMLCanvasElement>;
  private renderer: WebGLRenderer;
  private scenes: { [key: string]: Scene } = {};
  constructor(private ngZone: NgZone) {}

public set threeCanvas(element: ElementRef<HTMLCanvasElement>) {
    this.canvas = element;
  }

  public get threeCanvas(): ElementRef<HTMLCanvasElement> {
    return this.canvas;
  }

  public init() {
    //this.setRenderer(this.threeCanvas.nativeElement);
  }

  public render(scene): void {
    if (!scene) return;
    this.scenes[scene.uuid] = scene;
    const renderFunction = () => {
      this.renderer.clear(false, true, true);
      Object.entries(this.scenes).forEach(([key, scene]) => {
        this.setViewport(scene.userData.element);
        this.renderer.render(scene, scene.userData.camera);
      });
    };
    this.ngZone.runOutsideAngular(() =>
      document.readyState !== "loading"
        ? renderFunction()
        : window.addEventListener("DOMContentLoaded", renderFunction)
    );
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
      precision: "highp",
      antialias: true
    });
    this.renderer.autoClear = false;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }
}
