import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface User {
  username: string;
  password: string;
  role: 'admin' | 'barangay_official';
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  // Mock users - In real application, this would come from a backend service
  private authorizedUsers: User[] = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'official', password: 'official123', role: 'barangay_official' }
  ];

  onSubmit() {
    const user = this.authorizedUsers.find(
      u => u.username === this.username && u.password === this.password
    );

    if (user) {
      console.log(`Login successful. Role: ${user.role}`);
      // Here you would:
      // 1. Store user session/token
      // 2. Redirect to appropriate dashboard based on role
      // 3. Set up user permissions
    } else {
      console.log('Invalid credentials');
      // Show error message to user
    }
  }
}
