import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/student.model'; 
import { MessageService } from '../service/message.service';

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

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router, 
  private messageService: MessageService) { }
  addStudent() {
    if (this.isMajorValid(this.newStudent.major)) {
      this.http.post<Student>(`${this.baseUrl}students`, this.newStudent).subscribe({
        next: (result) => {
          this.resetForm(); // Reset form fields
          this.messageService.sendSuccessMessage('Student saved successfully!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      // Major validation error handling
      console.error('Major is not valid.');
    }
  }
  addGrade() {
    if (this.isGradeValid(this.newGrade)) {
      const duplicateIndex = this.newStudent.grades.findIndex(grade => grade.subjectName === this.newGrade.subjectName);
      if (duplicateIndex === -1) {
        this.newStudent.grades.push({ ...this.newGrade });
        this.newGrade = { subjectName: '', score: 0 };
      }
      else {
        console.error('Duplicate subject found.');
      }
    } else {
      console.error('Invalid grade.');
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

  isMajorValid(major: string): boolean {
    return this.subjects.includes(major);
  }

  isGradeValid(grade: { subjectName: string; score: number }): boolean {
    return !!grade.subjectName && grade.score >= 0 && grade.score <= 100;
  }
}
