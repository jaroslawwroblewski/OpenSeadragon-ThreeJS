import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { OsdService } from "../../services/osd.service";

@Component({
  selector: "app-viewport",
  templateUrl: "./viewport.component.html",
  styleUrls: ["./viewport.component.scss"],
  providers: [OsdService]
})
export class ViewportComponent implements OnInit {
  @Input() viewportId: string;
  @Input() annotations: any[];

  constructor(private osdService: OsdService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.osdService.init(this.viewportId);
  }
}
