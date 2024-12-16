import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    // Here you would typically make an API call to verify admin credentials
    if (this.username === 'admin' && this.password === 'admin123') {
      console.log('Admin login successful');
      // Navigate to admin dashboard
      // Store admin session
    } else {
      console.log('Invalid admin credentials');
      // Show error message
    }
  }
}
