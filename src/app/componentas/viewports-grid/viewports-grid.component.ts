import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ThreeMultipleInstanceService } from '../../services/three-multiple-instance.service';
import { mockViewports, Viewport } from '../../mocks/viewports.mock';

@Component({
  selector: 'app-viewports-grid',
  templateUrl: './viewports-grid.component.html',
  styleUrls: ['./viewports-grid.component.scss']
})
export class ViewportsGridComponent implements OnInit, AfterViewInit {
  @ViewChild('threejsCanvas', { static: true })
  public threeCanvas: ElementRef<HTMLCanvasElement>;
  public viewports: Viewport[];
  public isSingleInstances: boolean;

  constructor(private threeService: ThreeMultipleInstanceService) {}

  ngOnInit() {
    this.viewports = mockViewports;
    
    this.isSingleInstances = false;
  }

  ngAfterViewInit(): void {
    // this.threeService.init();
  }
}
