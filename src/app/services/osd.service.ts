import { ElementRef, Injectable } from "@angular/core";
import * as OpenSeadragon from "openseadragon";

@Injectable({ providedIn: "root" })
export class OsdService {
  constructor() {}

  public init(canvas: HTMLCanvasElement): void {
    new OpenSeadragon({
      id: "example-custom-tilesource",
      prefixUrl: "/openseadragon/images/",
      navigatorSizeRatio: 0.25,
      wrapHorizontal: true,
      tileSources: {
        height: 512 * 256,
        width: 512 * 256,
        tileSize: 256,
        minLevel: 8,
        getTileUrl: function(level, x, y) {
          return (
            "http://s3.amazonaws.com/com.modestmaps.bluemarble/" +
            (level - 8) +
            "-r" +
            y +
            "-c" +
            x +
            ".jpg"
          );
        }
      }
    });
  }
}
