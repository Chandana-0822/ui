import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() {}

  getUsers() {
    return axios.get(`${environment.apiBaseUrl}/users`);
  }

  createUser(user: any) {
    return axios.post(`${environment.apiBaseUrl}/users`, user);
  }

  updateUser(id: number, user: any) {
    return axios.put(`${environment.apiBaseUrl}/users/${id}`, user);
  }

  deleteUser(id: number) {
    return axios.delete(`${environment.apiBaseUrl}/users/${id}`);
  }

  searchUsername(userName: string, firstName: string, lastName: string) {
    return axios.post(`${environment.apiBaseUrl}/users/search`, {
      username: userName,
      first_name: firstName,
      last_name: lastName,
    }).then((response) => response.data);
  }
}
