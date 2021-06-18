import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { WebGLRendererInfo } from '../models/webgl-renderer-info.model';

@Injectable({
  providedIn: 'root'
})
export class PerformanceMetricService {
  private subject$ = new Subject<WebGLRendererInfo>();

  private metricValues$ = this.subject$.pipe(
    scan((acc, val) => ({ ...acc, [val.viewportId]: val }), {})
  );

  public addNewMetric(webGLRendererInfo: WebGLRendererInfo) {
    this.subject$.next(webGLRendererInfo);
  }

  public getViewportMetric$(viewportId: string): Observable<WebGLRendererInfo> {
    return this.metricValues$.pipe(
      map(metricValues => metricValues[viewportId])
    );
  }
}
