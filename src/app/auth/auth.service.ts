import { Injectable } from '@angular/core';
import { UserLoginType } from './userLogin';
import { USER } from './UserSecret';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
// $ - common to show that it is an observable
// BehaviorSubject always holds the current value and emits it to new subscribers immediately.
// BehaviorSubject allows you to update the state and emit new values using the next() method,
//  making it easy to manage and propagate state changes. Observable, but it might require 
// more boilerplate code to achieve similar functionality.

// If you start with an Observable directly, you typically need to create it from a source 
// that can emit values over time, such as an event or a stream.

private _isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

// Assignment below : Other parts of your application can subscribe to 
 // isUserLoggedIn$ to get updates 
// about the user’s login status, but they cannot directly change the state.

isUserLoggedIn$ = this._isUserLoggedIn$.asObservable(); // Creates a new Observable with this Subject as the source


// -------------------------------------------------------------------
  // destructuring assignment: username and password are being extracted from the UserLoginType object 
 // short form1: login({username, password}: UserLoginType){}
 // short form2: login(userLoginType: UserLoginType){
 //                const { username, password } = userLoginType;
//              }
  login(userLoginType: UserLoginType): boolean{
    const username = userLoginType.username;
    const password = userLoginType.password;

    const isValid = password === USER.password && username === USER.username;
    if(!isValid)
      return false;

    this._isUserLoggedIn$.next(true); // emit the new value
    return true;
  }

  logout(): void{

  }
}
