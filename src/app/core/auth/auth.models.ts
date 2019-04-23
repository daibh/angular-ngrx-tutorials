import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  credentials?: any;
  token?: string;
  error?: HttpErrorResponse;
  account?: any;
  menu?: any[];
  tabs?: any[];
  tab?: string;
}

export interface AuthenticateResponse {
  token: string;
}
