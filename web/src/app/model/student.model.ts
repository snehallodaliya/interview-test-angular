export interface Student {
    id: number | 0;
    firstName: string;
    lastName: string;
    email: string;
    major: string;
    grades: { subjectName: string; score: number }[];
    averageGrade?: number; // Optional property for average grade
  }
  