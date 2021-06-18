import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ViewportsGridComponent } from './components/viewports-grid/viewports-grid.component';
import { ViewportComponent } from './components/viewport/viewport.component';
import { ThreeSingleInstanceService } from './services/three-single-instance.service';
import { PerformanceMetricService } from './services/performance-metric.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ViewportsGridComponent, ViewportComponent],
  bootstrap: [AppComponent],
  providers: [ThreeSingleInstanceService, PerformanceMetricService]
})
export class AppModule {}
