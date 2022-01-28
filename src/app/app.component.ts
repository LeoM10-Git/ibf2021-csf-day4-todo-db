import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from "./Task";
import {v4 as uuidv4} from 'uuid';
import {TodoServiceService} from "./todo-service.service";
import {single} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  tomorrow = new Date();
  form: FormGroup;
  taskFormControl = new FormControl('', [Validators.required]);
  priorityFormControl = new FormControl('', [Validators.required]);
  dueDateFormControl = new FormControl('', [Validators.required]);
  todoValues: Task[]=[];
  priority = ["High", "Medium", "Low"];
  toUpdate: boolean=true;
  taskId: string='';
  checked: boolean=false;
  key: string = '';

  constructor(private fb: FormBuilder,
              private todoService: TodoServiceService){
    this.tomorrow.setDate(this.tomorrow.getDate()+1)
    this.form = this.fb.group({
      task: this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl
    })
  }

  ngOnInit(): void{
    this.todoService.getTasks().subscribe(tasks => this.todoValues = tasks)
  }
  addToDo() {
      console.log("add todo");
    let taskId = uuidv4();
    let singleTodo = new Task(
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      taskId
    )

    this.todoValues.push(singleTodo);
    this.taskFormControl.reset();
    this.priorityFormControl.reset();
    this.dueDateFormControl.reset();
    this.todoService.addTask(singleTodo).subscribe(task => {console.log(task)});
  }

  deleteTask(taskId: string){
    console.log(this.todoValues[this.todoValues.findIndex(task => task.taskId === taskId)])
    this.todoService.deleteTask(this.todoValues[this.todoValues.findIndex(task => task.taskId === taskId)])
      .subscribe(task => console.log("task deleted"));
    this.todoValues = this.todoValues.filter(task => task.taskId !== taskId)
  }

  editTask(task: Task){
    this.toUpdate = false;
    this.taskFormControl = new FormControl(`${task.task}`, [Validators.required]);
    this.priorityFormControl = new FormControl(`${task.priority}`, [Validators.required]);
    this.dueDateFormControl = new FormControl(task.dueDate, [Validators.required]);
    this.taskId = task.taskId;
    this.form = this.fb.group({
      task: this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl
    })
  }

  updateTask(taskId: string){
        console.log(taskId);
    this.todoValues[this.todoValues.findIndex(task => task.taskId === taskId)] = new Task(
          this.form.value.task,
          this.form.value.priority,
          this.form.value.dueDate,
          taskId
        );
    this.taskFormControl.reset();
    this.priorityFormControl.reset();
    this.dueDateFormControl.reset();
    this.toUpdate = true;
    this.todoService.updateTask(this.todoValues[this.todoValues.findIndex(task => task.taskId === taskId)])
      .subscribe(task => {console.log(task)});
  }

  complete(checked: boolean) {
    this.checked = checked;
  }
}
