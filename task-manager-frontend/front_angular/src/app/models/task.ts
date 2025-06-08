export interface TaskBase {
  idProject: string;
  description: string;
}


export interface Task extends TaskBase {
  id: string;
  completed: boolean;
  createdAt: Date;
}

export interface TaskPayload extends TaskBase {

}
