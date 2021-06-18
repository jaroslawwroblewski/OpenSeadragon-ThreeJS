import { Component, Input, OnInit } from '@angular/core';
import { WebGLRendererInfo } from '../../models/webgl-renderer-info.model';
import { PerformanceMetricService } from '../../services/performance-metric.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-performance-measure',
  templateUrl: './performance-measure.component.html',
  styleUrls: ['./performance-measure.component.scss'],
})

export class PerformanceMeasureComponent implements OnInit {

  @Input()
  public viewportId: string;
  public performanceMetric$: Observable<WebGLRendererInfo>;

  constructor(private performanceMetricService: PerformanceMetricService) {}

  ngOnInit(): void {
    this.performanceMetric$ = this.performanceMetricService.getViewportMetric$(
      this.viewportId
    );

    this.performanceMetric$.subscribe(console.log);
  }

}