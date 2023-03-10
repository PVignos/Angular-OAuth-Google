import {auth} from 'firebase/app';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: BehaviorSubject<
    Observable<firebase.User | null>
    > = new BehaviorSubject<any>(null);

  user$ = this.user
    .asObservable()
    .pipe(switchMap((user: Observable<firebase.User | null>) => user));

  constructor(private afAuth: AngularFireAuth) {
    this.user.next(this.afAuth.authState);
  }

  loginViaGoogle(): Observable<auth.UserCredential> {
    return from(this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
