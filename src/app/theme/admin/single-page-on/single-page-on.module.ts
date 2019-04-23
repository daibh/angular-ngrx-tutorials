import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SinglePageOnRoutingModule } from './single-page-on-routing.module';
import { SinglePageOnComponent } from './single-page-on.component';
import { UserComponent } from './tabs/components/user/user.component';
import { UserNewComponent } from './tabs/components/user/user-new/user-new.component';

@NgModule({
  imports: [
    CommonModule,
    SinglePageOnRoutingModule,
    SharedModule,
  ],
  declarations: [SinglePageOnComponent, UserComponent, UserNewComponent],
  entryComponents: [UserNewComponent]
})
export class SinglePageOnModule { }
