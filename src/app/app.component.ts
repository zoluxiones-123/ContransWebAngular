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

  constructor (private router: Router) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      this.logout();
    });  
  }


  logout() {
    localStorage.setItem("Usuario",null);
    this.router.navigate(['/login']);
  }

  setTimeout() {
    this.userActivity = 
    setTimeout(() => {
      if (localStorage.getItem("Usuario") != null) {
        this.userInactive.next(undefined);
        console.log('logged out');
      }
    }, 5000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
