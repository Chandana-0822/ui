import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router'; 
import { MatTableModule } from '@angular/material/table'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [RouterModule, MatTableModule]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>(this.users);
  displayedColumns: string[] = ['id', 'user_name', 'email', 'department', 'user_status', 'actions'];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().then((response) => {
      this.users = response.data;
      this.dataSource.data = this.users
    }).catch((error) => {
      alert(`Error fetching users: ${error.message}`);
    });
  }

  navigateToDelete(id: number) {
    // Navigate to the Delete Component with the user ID
    this.router.navigate(['/users/delete', id]);
  }
}
