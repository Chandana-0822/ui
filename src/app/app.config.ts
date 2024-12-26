import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

export const appConfig = [
  provideRouter(routes),
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(MatTableModule),
  importProvidersFrom(FormsModule),
];
