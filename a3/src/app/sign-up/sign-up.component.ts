import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  onSignup() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!this.isPasswordValid(this.password)) {
      alert('Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
      return;
    }

    this.authService.signup(this.username, this.password, this.confirmPassword).subscribe({
      next: () => {
        alert('Signup successful');
        this.router.navigate(['/log-in']);
      },
      error: (err) => {
        console.error('Signup Error:', err);
        alert('Username already exists or error signing up');
      },
    });
  }
  isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
}

