import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    setTimeout(() => this.router.navigateByUrl('/hope'), 3000);
  }
}
