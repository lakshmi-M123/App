import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.html',
  styleUrls: ['./success.css'],
})
export class SuccessComponent {
  message = '';

  constructor(private router: Router) {}

  showMessage() {
    this.message = 'Button clicked successfully!';
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
