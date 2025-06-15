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
    
    // API URLs //

    // Task-related URLs
    private getTasksUrl: string = `${environment.apiUrl}/tasks/getTasks`
    private createTaskUrl: string = `${environment.apiUrl}/tasks/addTask`
    private markTaskCompleteUrl: string = `${environment.apiUrl}/tasks/mark-done`
    private markTaskIncompleteUrl: string = `${environment.apiUrl}/tasks/mark-not-done`
    // Project-related URLs
    private getProjectsUrl: string = `${environment.apiUrl}/projects/getProjects`
    private createProjectUrl: string = `${environment.apiUrl}/projects/addProject`
    private editProjectUrl: string = `${environment.apiUrl}/projects/updateProject`;
    private deleteProjectUrl: string = `${environment.apiUrl}/projects/deleteProject`;


    // Task-related methods
    public getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.getTasksUrl);
    }
    public createTask(task: TaskPayload): Observable<Task> {
        return this.http.post<Task>(this.createTaskUrl, task);
    }
    public markTaskComplete(taskId: string): Observable<Task> {
        return this.http.put<Task>(this.markTaskCompleteUrl, { id: taskId } );
    }
    public markTaskIncomplete(taskId: string): Observable<Task> {
        return this.http.put<Task>(this.markTaskIncompleteUrl, { id: taskId });
    }
    // Project-related methods
    public getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.getProjectsUrl);
    }
    public createProject(project: ProjectPayload): Observable<Project> {
        return this.http.post<Project>(this.createProjectUrl, project);
    }
    public editProject(project: Project): Observable<Project> {
        return this.http.put<Project>(this.editProjectUrl, project);
    }
    public deleteProject(projectId: string): Observable<void> {
        return this.http.delete<void>(`${this.deleteProjectUrl}/${projectId}`);
    }
}