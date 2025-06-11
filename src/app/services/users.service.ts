import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User, UserResponse, UsersResponse } from '../interfaces/reqres.interface';
import { catchError, delay, map, Observable, Subscription, tap, throwError } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

const baseUrl = 'https://reqres.in/api';

interface State {
  users: User[],
  loading: boolean,
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject( HttpClient );

  // public usersResource = rxResource({
  //   stream: () => this.http.get<UsersResponse>(`${baseUrl}/users`, {
  //     headers: {
  //       "x-api-key": "reqres-free-v1"
  //     }
  //     }).pipe(
  //       map((res: UsersResponse) => res.data),
  //       catchError(err => {
  //         console.error('Error fetching users:', err);
  //         return throwError(() => new Error('Failed to load users. Please try again.'));
  //       })
  //     ),
  //   defaultValue: [] as User[],
  // });

  public usersResource = httpResource<UsersResponse>(
    () => ({
      url: `${baseUrl}/users`,
      method: 'GET',
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    })
  );

  usersComputed = computed(() => this.usersResource.value()?.data ?? [] as User[]);

  // public userResource = (idUser: number) => rxResource({
  //   stream: () => this.http.get<UserResponse>(`${baseUrl}/users/${idUser}`, {
  //     headers: {
  //       "x-api-key": "reqres-free-v1"
  //     }
  //   }).pipe(
  //     map((res: UserResponse) => res.data),
  //     catchError(err => {
  //       console.error('Error fetching user:', err);
  //       return throwError(() => new Error('Failed to load user. Please try again.'));
  //     })
  //   ),
  //   defaultValue: undefined,
  // });

  //public userComputed = (idUser: number) => computed(() => this.userResource(idUser).value() ?? undefined );

  public userResource = (idUser: number) => httpResource<UserResponse>(
    () => {
      return {
        url: `${baseUrl}/users/${idUser}`,
        method: 'GET',
        headers: {
          "x-api-key": "reqres-free-v1"
        }
      };
    }
  );

}


