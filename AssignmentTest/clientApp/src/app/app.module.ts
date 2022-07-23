import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoFinancialHighlightDisplayComponent } from './co-financial-highlight-display/co-financial-highlight-display.component';
import { CoFinancialHighlightCmsComponent } from './co-financial-highlight-cms/co-financial-highlight-cms.component';

@NgModule({
  declarations: [
    AppComponent,
    CoFinancialHighlightDisplayComponent,
    CoFinancialHighlightCmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: 'BASE_URL', useFactory: getBaseUrl }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
