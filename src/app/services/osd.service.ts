import { ElementRef, Injectable } from '@angular/core';
import OpenSeadragon from 'openseadragon';

@Injectable()
export class OsdService {
  public viewer: OpenSeadragon;
  constructor() {}

  public init(viewportId: string, canvas: HTMLCanvasElement) {
    this.viewer = OpenSeadragon({
      id: 'viewport-' + viewportId,
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
      tileSources:
        'https://openseadragon.github.io/example-images/duomo/duomo.dzi',
      showNavigationControl: false
    });

    this.viewer.addHandler('open', () => {
      //this.createScene(id, canvas);
    });
  }
}
