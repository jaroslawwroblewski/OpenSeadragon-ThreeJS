import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { ThreeService } from "../../services/three.service";
import { OsdService } from "../../services/osd.service";

@Component({
  selector: "app-viewports-grid",
  templateUrl: "./viewports-grid.component.html",
  styleUrls: ["./viewports-grid.component.scss"]
})
export class ViewportsGridComponent implements OnInit, AfterViewInit {
  @ViewChild("osdCanvas", { static: true })
  public osdCanvas: ElementRef<HTMLElement>;

  @ViewChild("threejsCanvas", { static: true })
  public threeCanvas: ElementRef<HTMLCanvasElement>;

  constructor(
    private threeService: ThreeService,
    private osdService: OsdService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.osdService.init(this.threeCanvas.nativeElement);
    this.threeService.init();
  }
}
