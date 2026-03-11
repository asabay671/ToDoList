import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/model';
import { Status } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  private http = inject(HttpClient);

  getTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(id: number, status: Status) {
    return this.http.patch(`${this.apiUrl}/${id}`, { status });
  }

  createTask(task: Task) {
    return this.http.post<Task>(this.apiUrl, task);
  }
}
