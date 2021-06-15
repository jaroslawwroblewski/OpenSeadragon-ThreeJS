import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { ThreeService } from '../../services/three.service';
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

  constructor(private threeService: ThreeService) {}

  ngOnInit() {
    this.viewports = mockViewports;
  }

  ngAfterViewInit(): void {
    // this.threeService.init();
  }
}
