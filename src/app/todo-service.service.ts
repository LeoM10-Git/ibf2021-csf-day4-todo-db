import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "./Task";

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })}

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private apiUrl = "http://localhost:3000/task"

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task>{
    const url = `${this.apiUrl}/${task.taskId}`
    return this.httpClient.delete<Task>(url);
  }

  updateTask(task: Task): Observable<Task>{
    const url = `${this.apiUrl}/${task.taskId}`;
    return this.httpClient.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task>{
    return this.httpClient.post<Task>(`${this.apiUrl}`, task, httpOptions);
  }








}
