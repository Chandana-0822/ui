import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
  imports: [CommonModule], // Add CommonModule here
})
export class UserDeleteComponent implements OnInit {
  userId: number | null = null;
  userEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch the user's email
    if (this.userId) {
      this.userService.getUsers().then((response) => {
        const user = response.data.find((u: any) => u.user_id === this.userId);
        if (user) {
          this.userEmail = user.email;
        }
      }).catch((error) => {
        alert(`Error fetching user: ${error.message}`);
        this.router.navigate(['/users']);
      });
    }
  }

  confirmDelete() {
    if (!this.userId) {
      alert('Invalid user ID');
      return;
    }

    this.userService.deleteUser(this.userId).then(() => {
      alert('User deleted successfully!');
      this.router.navigate(['/users']);
    }).catch((error) => {
      alert(`Error deleting user: ${error.message}`);
    });
  }

  cancelDelete() {
    this.router.navigate(['/users']); // Navigate back to the user list on cancel
  }
}
