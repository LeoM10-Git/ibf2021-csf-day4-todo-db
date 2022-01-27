import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from "./Task";
import {v4 as uuidv4} from 'uuid';

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

  constructor(private fb: FormBuilder){
    this.tomorrow.setDate(this.tomorrow.getDate()+1)
    this.form = this.fb.group({
      task: this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl
    })
  }

  ngOnInit(): void{

    for(let i=0;i<localStorage.length; i++) {
      this.key = localStorage.key( i )!;
      if (this.key == null) {
        return ;
      } else{
        let item = JSON.parse( localStorage.getItem( this.key )|| '');
        this.todoValues.push( item );
      }
    }
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
    localStorage.setItem(taskId, JSON.stringify(singleTodo))
  }

  deleteTask(taskId: string){
    this.todoValues = this.todoValues.filter(task => task.taskId !== taskId)
    localStorage.removeItem(taskId)
  }

  editTask(task: Task){
    this.toUpdate = false;
    // console.log(task.dueDate)
    // let date = moment(task.dueDate).format("DD/MM/YYYY");
    // console.log(typeof (date));
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

  }

  complete(checked: boolean) {
    this.checked = checked;
  }
}
