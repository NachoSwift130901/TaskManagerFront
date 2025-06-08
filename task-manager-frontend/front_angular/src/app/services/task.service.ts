import { Injectable } from "@angular/core";
import { environment } from "../env/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Task, TaskPayload } from "../models/task";
import { Project, ProjectPayload } from "../models/project";

@Injectable({
  providedIn: 'root'})
export class TaskService {
    constructor(private http: HttpClient) { }
    
    private getTasksUrl: string = `${environment.apiUrl}/tasks/getTasks`
    private createTaskUrl: string = `${environment.apiUrl}/tasks/addTask`
    private getProjectsUrl: string = `${environment.apiUrl}/projects/getProjects`
    private createProjectUrl: string = `${environment.apiUrl}/projects/addProject`


    public getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.getTasksUrl);
    }

    public createTask(task: TaskPayload): Observable<Task> {
        return this.http.post<Task>(this.createTaskUrl, task);
    }

    public getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.getProjectsUrl);
    }

    public createProject(project: ProjectPayload): Observable<Project> {
        return this.http.post<Project>(this.createProjectUrl, project);
    }

    
}