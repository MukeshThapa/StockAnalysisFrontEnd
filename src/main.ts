import { bootstrapApplication } from '@angular/platform-browser';
import { StockListComponent } from './app/stock-list/stock-list.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

bootstrapApplication(StockListComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    importProvidersFrom(MatToolbarModule),
    importProvidersFrom(MatButtonModule),
    importProvidersFrom(MatMenuModule),
  ],
}).catch((err) => console.error(err));