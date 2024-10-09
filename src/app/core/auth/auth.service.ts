import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { Usuario } from '../model/user.model';
import { State } from '../model/state.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  http: HttpClient = inject(HttpClient);
  location: Location = inject(Location);
  notConnected: string = "NOT_CONNECTED";
  
  private fetchUser$: WritableSignal<State<Usuario>> =
    signal(State.Builder<Usuario>().forSuccess({correoElectronico: this.notConnected}));
  fetchUser = computed(() => this.fetchUser$());

  fetch(forceResync: boolean): void {
    this.fetchHttpUser(forceResync)
      .subscribe({
        next: user => this.fetchUser$.set(State.Builder<Usuario>().forSuccess(user)),
        error: err => {
          if (err.status === HttpStatusCode.Unauthorized && this.isAuthenticated()) {
            this.fetchUser$.set(State.Builder<Usuario>().forSuccess({correoElectronico: this.notConnected}));
          } else {
            this.fetchUser$.set(State.Builder<Usuario>().forError(err));
          }
        }
      });
  }

  login(): void {
    window.location.href = `${window.location.origin}${this.location.prepareExternalUrl("oauth2/authorization/okta")}`;
  }

  logout(): void {
    this.http.post(`${environment.API_URL}/auth/logout`, {})
      .subscribe({
        next: (response: any) => {
          this.fetchUser$.set(State.Builder<Usuario>()
            .forSuccess({correoElectronico: this.notConnected}));
          window.location.href = response.logoutUrl;
        }
      });
  }

  isAuthenticated(): boolean {
    const user = this.fetchUser$().value;
    return user ? user.correoElectronico !== this.notConnected : false;
  }

  fetchHttpUser(forceResync: boolean): Observable<Usuario> {
    const params = new HttpParams().set('forceResync', forceResync);
    return this.http.get<Usuario>(`${environment.API_URL}/auth/get-authenticated-user`, { params });
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    const user = this.fetchUser$().value;
    if (!user || user.correoElectronico === this.notConnected || !user.autoridades) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return user.autoridades.some((authority: string) => authorities.includes(authority));
  }
}