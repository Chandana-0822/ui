import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
  imports: [FormsModule, CommonModule] // Add FormsModule to imports
})
export class UserUpdateComponent implements OnInit {
  userId: number | null = null;
  user = {
    user_name: '',
    first_name: '',
    last_name: '',
    department: '',
    user_status: '',
  };

  userStatusOptions = [
    { value: 'A', label: 'Active' },
    { value: 'I', label: 'Inactive' },
    { value: 'T', label: 'Terminated' },
  ];

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchUser();
  }

  fetchUser() {
    this.userService.getUsers().then((response) => {
      const existingUser = response.data.find((u: any) => u.user_id === this.userId);
      if (existingUser) {
        this.user = existingUser;
      }
    });
  }

  updateUser() {
    if (!this.userId) {
      alert('Invalid user ID');
      return;
    }

    this.userService.updateUser(this.userId, this.user).then(() => {
      alert('User updated successfully!');
      this.router.navigate(['/users']); // Navigate back to the Users List page
    }).catch((error) => {
      alert(`Error updating user: ${error.message}`);
    });
  }

  goBack() {
    this.location.back(); // Navigate to the previous page
  }
}
