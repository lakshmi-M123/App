import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class SignupComponent implements OnInit {

  username = '';
  email = '';
  password = '';
  error = '';
  shouldCallApi = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    if (this.shouldCallApi) {
      this.auth.signup({
        username: this.username,
        email: this.email,
        password: this.password
      }).subscribe({
        next: () => {
          alert('Signup successful');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = err.error?.detail || 'Signup failed';
        }
      });
    }
  }

  onSubmit() {
    if (!this.username || !this.email || !this.password) {
      this.error = 'All fields are required';
      return;
    }

    this.error = '';
    this.shouldCallApi = true;
    this.ngOnInit(); // manually trigger API call in lifecycle
  }

  goToSignin() {
    this.router.navigate(['/login']);
  }
}
