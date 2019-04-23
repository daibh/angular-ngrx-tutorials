import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {SpinnerComponent} from './spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from '../layout/auth/title/title.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HttpClientModule,
  ],
  exports: [
    NgbModule,    
    HttpClientModule,
    SpinnerComponent,
    TitleComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SpinnerComponent,
    TitleComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class SharedModule { }
