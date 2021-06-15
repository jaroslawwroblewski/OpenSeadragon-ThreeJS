import { ElementRef, Injectable } from '@angular/core';
import OpenSeadragon from 'openseadragon';

@Injectable()
export class OsdService {
  public viewer: OpenSeadragon;
  constructor() {}

  public init(viewportId: string) {
    this.viewer = OpenSeadragon({
      id: 'viewport-' + viewportId,
      prefixUrl: '/openseadragon/images/',
      navigatorSizeRatio: 0.25,
      wrapHorizontal: true,
      tileSources:
        'https://openseadragon.github.io/example-images/duomo/duomo.dzi',
      showNavigationControl: false
    });
  }
}
