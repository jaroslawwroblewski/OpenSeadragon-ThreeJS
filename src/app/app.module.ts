import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ViewportsGridComponent } from './componentas/viewports-grid/viewports-grid.component';
import { ViewportComponent } from './componentas/viewport/viewport.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ViewportsGridComponent, ViewportComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
