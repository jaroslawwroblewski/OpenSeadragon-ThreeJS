import { ElementRef, Injectable } from '@angular/core';
import OpenSeadragon from 'openseadragon';

@Injectable()
export class OsdService {
  constructor() {}

  public init(viewportId: string): OpenSeadragon {
    return new OpenSeadragon({
      id: 'viewport-' + viewportId,
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
      tileSources:
        'https://openseadragon.github.io/example-images/duomo/duomo.dzi',
      showNavigationControl: false
    });
  }
}
