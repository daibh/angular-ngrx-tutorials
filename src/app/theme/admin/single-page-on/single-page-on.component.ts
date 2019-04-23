import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/core.state';
import { Observable } from 'rxjs';
import { selectMenu, selectTab, selectActivedTab } from 'src/app/core/auth/auth.selectors';
import { ActionRemoveTab, ActionActiveTab } from 'src/app/core/auth/auth.actions';

@Component({
  selector: 'app-single-page-on',
  templateUrl: './single-page-on.component.html',
  styleUrls: ['./single-page-on.component.scss']
})
export class SinglePageOnComponent implements OnInit {
  private idCounter: number = 0;

  tabMenu$: Observable<any[]>;
  activedTab$: Observable<string>;


  constructor(
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.tabMenu$ = this.store.pipe(select(selectTab));
    this.activedTab$ = this.store.pipe(select(selectActivedTab));
  }

  beforeChange = $event => {
    if ($event.nextId === $event.active) {
      $event.preventDefault();
    } else {
      this.store.dispatch(new ActionActiveTab($event.nextId));
    }
  }

  public onCloseClick(tab: any, $event): void {
    this.store.dispatch(new ActionRemoveTab(Object.assign({}, tab)));
    $event.preventDefault();
  }

}
