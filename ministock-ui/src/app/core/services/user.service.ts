import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IRegisterUserRequest } from '../models/RegisterUserRequest';
import { catchError, Observable, take, throwError } from 'rxjs';
import { IRegisterUserResponse } from '../models/RegisterUserResponse';
import { IAuthRequest } from '../models/AuthRequest';
import { IAuthResponse } from '../models/AuthResponse';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  registerUser(data: IRegisterUserRequest): Observable<IRegisterUserResponse> {
    return this.http.post<IRegisterUserResponse>(`${this.API_URL}/user`,data)
      .pipe(take(1), catchError(this.handleError));
  }

  authUser(data: IAuthRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.API_URL}/auth`,data)
    .pipe(take(1), catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code: ${err.status}: ${err.message}`;
    }
    return throwError(() => errorMessage);
  }

  isLoggedIn(): boolean {
    return this.cookie.check('USER_INFO');
  }
}
