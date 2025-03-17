import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { StockListComponent } from './app/stock-list/stock-list.component';
import { Page1Component } from './app/page1/page1.component';
import { Page2Component } from './app/page2/page2.component';

const routes: Routes = [
  { path: '', component: StockListComponent }, // Default route (Home)
  { path: 'page1', component: Page1Component }, // Page 1
  { path: 'page2', component: Page2Component }, // Page 2
  { path: '**', redirectTo: '' }, // Redirect to default route for unknown paths
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    importProvidersFrom(MatToolbarModule),
    importProvidersFrom(MatButtonModule),
    importProvidersFrom(MatMenuModule),
    provideRouter(routes), // Provide the router configuration
  ],
}).catch((err) => console.error(err));