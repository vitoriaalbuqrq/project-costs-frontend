import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly JWT_TOKEN = 'auth-token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/auth/login', { email, password }).pipe(
      tap((response: any) => this.doLoginUser(email, response.token))
    );
  }

  private doLoginUser(email: string, token: string) {
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    sessionStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.JWT_TOKEN);
  }

  isTokenExpired(): boolean {
    const token = this.getJwtToken();
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    if (!decoded.exp) return true;

    const expirationDate = decoded.exp * 1000;
    return expirationDate < Date.now();
  }

  getJwtToken(): string | null {
    return sessionStorage.getItem(this.JWT_TOKEN);
  }

  refreshToken(): Observable<any> {
    const token = this.getJwtToken();
    if (!token) {
      return of(null); // Retorna um Observable vazio se não houver token
    }

    return this.http.post<any>('http://localhost:8080/auth/refresh-token', { token }).pipe(
      tap((response: any) => this.storeJwtToken(response.token))
    );
  }
}
