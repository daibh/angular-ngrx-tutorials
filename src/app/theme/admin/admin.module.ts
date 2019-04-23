import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminEffects } from './admin.effects';
import { FEATURE_NAME, reducers } from './admin.state';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    EffectsModule.forFeature([
      AdminEffects,
    ])
  ],
  declarations: [
  ],
  providers: []
})
export class AdminModule {
  constructor() {}
}
