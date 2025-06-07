import { Injectable } from "@angular/core";
import { environment } from "../env/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Task } from "../models/task";
import { Project } from "../models/project";

@Injectable({
  providedIn: 'root'})
export class TaskService {
    constructor(private http: HttpClient) { }
    
    private getTasksUrl: string = `${environment.apiUrl}/tasks`
    private getProjectsUrl: string = `${environment.apiUrl}/projects`


    public getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.getTasksUrl);
    }

    public getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.getProjectsUrl);
    }

    
}