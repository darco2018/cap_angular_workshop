import { Injectable } from '@angular/core';
import { UserLoginType } from './userLogin';
import { USER } from './UserSecret';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // destructuring assignment: username and password are being extracted from the UserLoginType object 
 // short form1: login({username, password}: UserLoginType){}
 // short form2: login(userLoginType: UserLoginType){
 //                const { username, password } = userLoginType;
//              }
  login(userLoginType: UserLoginType): boolean{
    const username = userLoginType.username;
    const password = userLoginType.password;

    return password === USER.password && username === USER.username;
  }
}
