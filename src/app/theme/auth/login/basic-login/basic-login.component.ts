import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/core.state';
import { ActionAuthenticate } from 'src/app/core/auth/auth.actions';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { selectIsAuthenticated, selectError } from 'src/app/core/auth/auth.selectors';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicLoginComponent implements OnInit {

  credentials: any;
  isAuthenticated$: Observable<boolean>;
  error$: Observable<HttpErrorResponse>;

  constructor(
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.credentials = new Object();
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.error$ = this.store.pipe(select(selectError));
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  login = () => {
    console.log('doLogin', this.credentials);
    this.store.dispatch(new ActionAuthenticate({ credentials: Object.assign({}, this.credentials) }));
    // this.accountService.authenticate(this.credentials).subscribe(res => {
    //   this.error = null;
    //   this.message = 'Login success\nBrowser will be auto navigate to home page';
    //   // do something to store token
    // }, res => {
    //   this.error = res.error.msg;
    // });
  }

}
