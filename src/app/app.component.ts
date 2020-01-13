import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userActivity;
  userInactive: Subject<any> = new Subject();
  tiempoSesion : number = 300000;

  constructor (private router: Router) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      this.logout();
    });
    if(localStorage.getItem("tiemposesion") != null){
      this.tiempoSesion = Number.parseInt(localStorage.getItem("tiemposesion"));
    }
  }


  logout() {
    localStorage.removeItem("Usuario");
    this.router.navigate(['/login']);
  }

  setTimeout() {
    this.userActivity = 
    setTimeout(() => {
      if (localStorage.getItem("Usuario") != null) {
        this.userInactive.next(undefined);
        console.log('logged out');
      }
    }, this.tiempoSesion);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
