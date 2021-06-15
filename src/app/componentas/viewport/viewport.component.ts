import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OsdService } from '../../services/osd.service';
import { ThreeMultipleInstanceService } from '../../services/three-multiple-instance.service';

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.scss'],
  providers: [OsdService, ThreeMultipleInstanceService]
})
export class ViewportComponent implements OnInit {
  @Input() viewportId: string;
  @Input() annotations: any[];
  @ViewChild('threejsCanvas', { static: true })
  public annotationCanvas: ElementRef<HTMLCanvasElement>;

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
      this.threeService.init(this.annotations, this.annotationCanvas.nativeElement)
    });
  }
}
