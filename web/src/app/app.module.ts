import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { FormsModule } from "@angular/forms";
import { AddStudentComponent } from './add-student/add-student.component';

import { MessageService } from './service/message.service';

function getBaseUrl() {
  return "http://localhost:5000/";
}

@NgModule({
  declarations: [AppComponent, HomeComponent, NavMenuComponent, AddStudentComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "home", component: HomeComponent, pathMatch: "full" },
      { path: 'add-student', component: AddStudentComponent, pathMatch: "full" }
    ]),
    HttpClientModule,
    FormsModule // Add FormsModule to imports array
  ],
  providers: [{ provide: "BASE_URL", useFactory: getBaseUrl, deps: [] }, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
