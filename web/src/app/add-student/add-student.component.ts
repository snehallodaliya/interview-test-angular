import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/student.model'; 

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  public newStudent: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    major: '',
    grades: [],
    averageGrade: 0,
  };
  public newGrade: { subjectName: string; score: number } = { subjectName: '', score: 0 };
  public subjects = ['Math', 'Physics', 'History', 'PE'];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) { }
  addStudent() {
    this.http.post<Student>(`${this.baseUrl}students`, this.newStudent).subscribe({
      next: (result) => {
        this.resetForm(); // Reset form fields
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  addGrade() {
    if (this.newGrade.subjectName && this.newGrade.score) {
      this.newStudent.grades.push({ ...this.newGrade });
      this.newGrade = { subjectName: '', score: 0 };
    }
  }

  removeGrade(index: number) {
    this.newStudent.grades.splice(index, 1);
  }
  resetForm() {
    this.newStudent = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      major: '',
      grades: [],
      averageGrade: 0,
    };
  }
}
