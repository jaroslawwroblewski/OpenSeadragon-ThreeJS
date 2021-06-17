import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OsdService } from '../../services/osd.service';
import { ThreeMultipleInstanceService } from '../../services/three-multiple-instance.service';
import { InstancesType } from '../../enums/threejs.enum';

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.scss'],
  providers: [OsdService, ThreeMultipleInstanceService]
})
export class ViewportComponent implements OnInit {
  @Input() viewportId: string;
  @Input() annotations: any[];
  @Input() threejsInstanceType: any;

  @ViewChild('threejsCanvas', { static: true })
  public annotationCanvas: ElementRef<HTMLCanvasElement>;
  public instancesType = InstancesType;

  constructor(
    private osdService: OsdService,
    private threeService: ThreeMultipleInstanceService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    // init OSD
    const viewer = this.osdService.init(this.viewportId);

    // init ThreeJS when OSD is ready!
    viewer.addHandler('open', () => {

      switch(this.threejsInstanceType) { 
        case InstancesType.Multiple: { 
          this.threeService.init(
          this.annotations,
          this.annotationCanvas.nativeElement,
          this.boundsInPixels(viewer)
        );
        break; 
        } 
        case InstancesType.Single: { 
            //statements; 
            break; 
        } 
        default: { 
            break; 
        } 
      } 
    });
  }

  private boundsInPixels(viewer) {
    const image = viewer?.world.getItemAt(0)
      ? viewer?.world.getItemAt(0)
      : viewer.viewport;
    return image.viewportToImageRectangle(viewer.viewport.getBounds())
  }
}
