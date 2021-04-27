import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { ThreeService } from "../../services/three.service";

@Component({
  selector: "app-viewports-grid",
  templateUrl: "./viewports-grid.component.html",
  styleUrls: ["./viewports-grid.component.scss"]
})
export class ViewportsGridComponent implements OnInit, AfterViewInit {
  @ViewChild("threejsCanvas", { static: true })
  public threeCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private threeService: ThreeService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.threeService.init();
  }
}
