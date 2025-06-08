import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { TaskService } from '../../services/task.service';
import { TaskPayload } from '../../models/task';

@Component({
  selector: 'app-add-task-modal',
  imports: [NzButtonModule, NzModalModule, NzInputModule, FormsModule],
  templateUrl: './add-task-modal.html',
  styleUrl: './add-task-modal.scss'
})
export class AddTaskModal {

  constructor(private taskService: TaskService, private message: NzMessageService) { }
  @Output() taskCreated = new EventEmitter<void>();
  @Input() idProject: string | null = null;
  taskDescription: string =  ''


  isVisible = false;
  isOkLoading = false;

  handleOk(): void {
    this.isOkLoading = true;
    if (!this.idProject) {
      console.error('No project ID set');
      return;
    }

    const taskPayload: TaskPayload = { description: this.taskDescription, idProject: this.idProject };
    this.taskService.createTask(taskPayload).subscribe({
      next: (createdTask) => {
        this.isVisible = false;
        this.isOkLoading = false;
        taskPayload.description = '';
        this.taskCreated.emit();
        this.message.success(`Task created successfully!`);
      },
      error: (error) => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.error(`Error creating task: ${error.message}`);
      }
    });
  }

  addTask(task: TaskPayload) {
    this.taskService.createTask(task).subscribe({
      next: (createdTask) => {
        console.log('Task created successfully:', createdTask);
      },
      error: (error) => {
        console.error('Error creating task:', error);
      }
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.taskDescription = '';
  }
}
