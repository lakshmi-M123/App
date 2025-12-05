import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  error = '';
  shouldCallApi = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    if (this.shouldCallApi) {
      this.auth.login({
        username: this.username,
        password: this.password
      }).subscribe({
        next: () => {
          alert('Login successful');
          this.router.navigate(['/success']);
        },
        error: (err) => {
          this.error = err.error?.detail || 'Login failed';
        }
      });
    }
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Both fields are required';
      return;
    }

    this.error = '';
    this.shouldCallApi = true;
    this.ngOnInit(); // trigger lifecycle, API runs inside
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
