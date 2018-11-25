import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/User';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private apiURL:string = `${environment.apiUrl}/users`;
  
  constructor(private http : HttpClient) { }

  public getMemberByEmail(email:string) : Observable<User|null> {
    let params = { params: new HttpParams().set('email', email) }
    return this.http.get<User[]>(this.apiURL, params).pipe(
      switchMap((results) => {
        if (results.length === 1) {
          return of(results[0]);
        } else {
          return of(null);
        }
      })
    )
  }

  bootUser() {
      const value = localStorage.getItem('currentUser');
      this.currentUser.next(JSON.parse(value));
      console.log(this.currentUser);
  }

  login( user : User ) : Promise<User|null>{
    return new Promise ((resolve, reject) => { this.getMemberByEmail(user.email).subscribe((result:User|null) =>{
      if (result) {
        if (result.password === user.password) {
          localStorage.setItem('currentUser', JSON.stringify(result));
          this.currentUser.next(result);
          resolve(result);
        }else {
          reject('Mot de passe invalide.');
        }}
        else {
          reject('Utilisateur inconnu');
        }
      }
    );
    });
  }

  register(user : User ) : Observable<User>{
    return this.http.post<User>(this.apiURL, user);
  }

  logout(): Promise<null> {
    return new Promise(resolve => {
      localStorage.removeItem('currentUser');
        this.currentUser.next(null);      
        resolve();
      })
    }
  
}
