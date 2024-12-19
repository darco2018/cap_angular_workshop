import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

// Guard of type CanActivate example

 // we are automatically redirected from '' to '/login' if guard returns false

// CanActivateFn is a type alias for a function that acts as a route guard. It takes two parameters:
// route: An ActivatedRouteSnapshot object that contains information about the current route
// state: A RouterStateSnapshot object that contains information about the router’s current state,
//    including the URL and other metadata.
//  The function returns either a UrlTree or a boolean
export const loginGuard: CanActivateFn = (route, state): UrlTree | boolean => {
  console.log( " ~ state:", state);
  console.log( " ~route:", route);

  // !! operator is a common JavaScript idiom used to convert a value to a boolean - (0 or 1)
  const canEnter = !!Math.round(Math.random()); // pretends a condition to be fullfilled, eg we are logged in or not

  const url: UrlTree = inject(Router).createUrlTree(['login']); // creates REDIRECT to 'login'
  return canEnter || url ;
  // url could be omitted, then we would only hane 2 options: naviagatio proceeds or is cancelled)
       // true || ...   ->  route ''(or any other in app.routes.ts) can be activated
       // false|| url is returnes -> route cannot be activated, you are redirected to 'login' (in other words, new route is initiated)
};
// If the function returns true, the route can be activated. 
// If it returns false, the route cannot be activated.
//  If the function returns a UrlTree, the current navigation is canceled, 
// and a new navigation begins to the URL represented by the UrlTree

// If canEnter is false, the expression canEnter || url evaluates to url 
//because false is falsy, and the OR operator moves 
// to the next operand, which is url.
