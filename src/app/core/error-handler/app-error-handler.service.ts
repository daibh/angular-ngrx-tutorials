import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AUTH_TOKEN, AUTH_KEY, AUTH_ACCOUNT, AUTH_MENU, AUTH_TABS } from '../auth/auth.constants';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { ActionAuthLogout } from '../auth/auth.actions';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(
    private localStorageService: LocalStorageService,
    // private store: Store<AppState>
    private injector: Injector
  ) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    let displayMessage = 'An error occurred.';

    console.log('ERROR: ', displayMessage, error);
    if (error instanceof HttpErrorResponse && (error as HttpErrorResponse).status === 401) {
      console.log('ERROR: ', (error as HttpErrorResponse).message);
      this.localStorageService.removeItem(AUTH_KEY);
      this.localStorageService.removeItem(AUTH_TOKEN);
      this.localStorageService.removeItem(AUTH_ACCOUNT);
      this.localStorageService.removeItem(AUTH_MENU);
      this.localStorageService.removeItem(AUTH_TABS);
      // this.store.dispatch(new ActionAuthLogout());
      const store = this.injector.get(Store);
      store.dispatch(new ActionAuthLogout());
      return;
    }
    super.handleError(error);
  }
}
