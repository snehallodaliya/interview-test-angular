import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  major: string;
  grades: { subjectName: string; score: number }[];
  averageGrade?: number; // Optional property for average grade
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public students: Student[] = [];
  public newStudent: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    major: '',
    grades: [],
    averageGrade: 0,
  };
  public showAddForm = false;
  public newGrade: { subjectName: string; score: number } = { subjectName: '', score: 0 };
  public subjects: string[] = ['Math', 'Physics', 'History', 'PE'];
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  // constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //   http.get<Student[]>(baseUrl + 'students').subscribe({
  //     next: (result) => {
  //       this.students = result;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     },
  //   });
  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.http.get<Student[]>(`${this.baseUrl}students`).subscribe({
      next: (result) => {
        this.students = result;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    // Reset form and newStudent object when hiding the form
    if (!this.showAddForm) {
      this.resetForm();
      this.newGrade = { subjectName: '', score: 0 };
    }
  }
  addStudent() {
    this.http.post<Student>(`${this.baseUrl}students`, this.newStudent).subscribe({
      next: (result) => {
        this.students.push(result); // Add newly created student to the list
        this.resetForm(); // Reset form fields
        this.showAddForm = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  addGrade() {
    if (this.newGrade.subjectName && this.newGrade.score) {
      this.newStudent.grades.push({ ...this.newGrade });
      this.newGrade = { subjectName: '', score: 0 }; // Clear the newGrade object
    }
  }
  removeGrade(index: number) {
    this.newStudent.grades.splice(index, 1);
  }
  deleteStudent(studentId: number) {
    this.http.delete<void>(`${this.baseUrl}students/${studentId}`).subscribe({
      next: () => {
        this.students = this.students.filter((s) => s.id !== studentId); // Remove deleted student from the list
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  getGradeColor(averageGrade: number | undefined): string {
    if (averageGrade === undefined) {
      return ''; // Return default class or empty string if averageGrade is undefined
    }
    if (averageGrade > 80) {
      return 'green';
    } else if (averageGrade > 50) {
      return 'orange';
    } else {
      return 'red';
    }
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
