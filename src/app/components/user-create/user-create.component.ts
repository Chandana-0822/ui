import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  imports: [FormsModule, CommonModule] // Add FormsModule to imports
})
export class UserCreateComponent {
  user = {
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    department: '',
    user_status: 'I',
  };

  userStatusOptions = [
    { value: 'I', label: 'Inactive' },
    { value: 'A', label: 'Active' },
    { value: 'T', label: 'Terminated' }
  ];

  usernameMessage: string = '';
  isUsernameInvalid: boolean = true;
  isUsernameValidated: boolean = false;
  suggestedUsernames: string[] = [];

  constructor(private userService: UserService, private router: Router, private location: Location) {}

  createUser() {
    if (!this.user.user_name || !this.user.first_name || !this.user.last_name || !this.user.email || !this.user.user_status || !this.user.email) {
      alert('Please fill all required fields!');
      return;
    }

    this.userService.createUser(this.user).then(() => {
      alert('User created successfully!');
      this.router.navigate(['/users']); // Navigate back to the Users List page
    }).catch((error) => {
      alert(`Error creating user: ${error.message}`);
    });
  }

  validateUsername() {
    if (!this.user.user_name) {
      this.usernameMessage = 'Username cannot be empty';
      this.isUsernameInvalid = true;
      this.isUsernameValidated = false;
      return;
    }

    this.userService.searchUsername(this.user.user_name, this.user.first_name, this.user.last_name).then((response: any) => {
      if (response.message === 'Username already exists') {
        this.usernameMessage = response.message;
        this.isUsernameInvalid = true;
        this.suggestedUsernames = response.suggestions || [];
      } else {
        this.usernameMessage = response.message; // "Username is Ready to use"
        this.isUsernameInvalid = false;
        this.suggestedUsernames = [];
        this.isUsernameValidated = true;
      }
    }).catch((error) => {
      alert(`Error validating username: ${error.message}`);
    });
  }

  goBack() {
    this.location.back(); // Navigate to the previous page
  }
}