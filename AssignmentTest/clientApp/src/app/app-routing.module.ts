import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoFinancialHighlightDisplayComponent} from './co-financial-highlight-display/co-financial-highlight-display.component'
import { CoFinancialHighlightCmsComponent } from './co-financial-highlight-cms/co-financial-highlight-cms.component'

const routes: Routes = [
  { path: '', redirectTo: 'Display', pathMatch: 'full' },
  { path: 'Display', component: CoFinancialHighlightDisplayComponent },
  { path: 'Cms', component: CoFinancialHighlightCmsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
