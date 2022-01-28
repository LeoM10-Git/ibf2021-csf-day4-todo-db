export class Task {
  constructor(
    public task:string,
    public priority:string,
    public dueDate: Date,
    public taskId: string,
    public status?: boolean
  ) {}
}
