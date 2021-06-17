import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ThreeSingleInstanceService } from '../../services/three-single-instance.service';
import { mockViewports, Viewport } from '../../mocks/viewports.mock';
import { THREEJS_INSTANES } from '../../core/threejs.settings';
import { InstancesType } from '../../enums/threejs.enum';

@Component({
  selector: 'app-viewports-grid',
  templateUrl: './viewports-grid.component.html',
  styleUrls: ['./viewports-grid.component.scss']
})
export class ViewportsGridComponent implements OnInit, AfterViewInit {
  @ViewChild('threejsSingleCanvas', { static: true })
  public singleAnnotationCanvas: ElementRef<HTMLCanvasElement>;
  public threejsInstanceType = THREEJS_INSTANES;
  public instancesType = InstancesType;
  public viewports: Viewport[];

  constructor(private threejsSingleService: ThreeSingleInstanceService) {}

  ngOnInit() {
    this.viewports = mockViewports;
    
  }

  ngAfterViewInit(): void {
    // this.threeService.init();
  }
}
