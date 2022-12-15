import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http:HttpClient , private router:Router) { }

  userSignUp(user:SignUp){
    this.http.post("http://localhost:3000/users",user,{observe:'response'})
    .subscribe((result)=>{
      console.warn(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/']);
      }
    })
}

userLogin(user:login){
  this.http.get<SignUp[]>(`http://localhost:3000/users?email=${user.email}&password=${user.password}`,
  {observe:'response'}).subscribe((result)=>{
    if(result && result.body?.length){
      this.invalidUserAuth.emit(false);
      localStorage.setItem('user',JSON.stringify(result.body[0]))
        this.router.navigate(['/']);
    }else{
      this.invalidUserAuth.emit(true);
    }
  })
}

userAuthReload(){
  if(localStorage.getItem('user')){
    this.router.navigate(['/']);
  }
}

}