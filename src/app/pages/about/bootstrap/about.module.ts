import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from '../ui/about/about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, NgOptimizedImage],
})
export class AboutModule {}
