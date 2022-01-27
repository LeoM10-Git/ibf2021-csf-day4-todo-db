import {NgModule} from "@angular/core"
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";

const MATERIAL = [
  MatRadioModule,
  MatDatepickerModule,
  MatInputModule,
  MatSliderModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatButtonModule,
  FormsModule,
  MatDividerModule,
  MatCardModule,
  MatIconModule,
  MatCheckboxModule,
]
@NgModule({
  imports: [MATERIAL],
  exports: [MATERIAL]
}
)

export class MaterialModule{

}
