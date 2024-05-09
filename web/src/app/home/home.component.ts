import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Student } from '../model/student.model'; 
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public students: Student[] = [];
  successMessage: string = '';
  private subscription: Subscription;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,private messageService: MessageService) {
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.messageService.getSuccessMessage().subscribe(message => {
      this.successMessage = message;
    });
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
    if (averageGrade >= 80) {
      return 'text-success'; // Green color for average grade >= 80
    } else if (averageGrade > 50) {
      return 'text-warning'; // Orange color for average grade > 50 and < 80
    } else {
      return 'text-danger'; // Red color for average grade <= 50
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }
}
