import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserCredential } from "@firebase/auth-types";
import { Observable, of, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { map } from "rxjs/operators";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User } from "../../interfaces/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private usersUrl = `${environment.firebaseConfig.databaseURL}/users`;
  users: User[] = [];
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.user$ = this.afAuth.authState;
  }

  registerUser(email: any, password: any): Promise<UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string): Promise<UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  getCurrentUser(): Observable<User | null> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          const uid = user.uid;
          const url = `${this.usersUrl}/${uid}.json`;
          return this.http.get<User>(url).pipe(
            catchError((error) => {
              console.error("Error fetching user data:", error);
              return throwError("User data not available");
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}.json`).pipe(
      catchError((error) => {
        console.error("Error fetching users:", error);
        return of([]);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }
}
