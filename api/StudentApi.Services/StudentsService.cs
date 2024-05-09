using StudentApi.Models.Students;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace StudentApi.Services
{
    public class StudentsService : IStudentsService
    {
        public List<Student> students = new List<Student>();

        public StudentsService()
        {
            students.Add(new Student
            {
                Id = 1,
                FirstName = "Marty",
                LastName = "McFly",
                Email = "back.future@test.com",
                Major = "History",
                Grades = new List<Grades>
                {
                    new Grades { SubjectName = "Math", Score = 85 },
                    new Grades { SubjectName = "Physics", Score = 90 },
                    new Grades { SubjectName = "History", Score = 78 },
                    new Grades { SubjectName = "PE", Score = 78 }
                },
                AverageGrade = 90
            });

            students.Add(new Student {
                Id = 2,
                FirstName = "Emmett",
                LastName = "Brown",
                Email = "dr.brown@test.com",
                Major = "Physics",
                Grades = new List<Grades>
                {
                    new Grades { SubjectName = "Math", Score = 85 },
                    new Grades { SubjectName = "Physics", Score = 90 },
                    new Grades { SubjectName = "History", Score = 78 },
                    new Grades { SubjectName = "PE", Score = 78 }
                },
                AverageGrade = 90
            });

            students.Add(new Student
            {
                Id = 3,
                FirstName = "Biff",
                LastName = "Tannen",
                Email = "biff@test.com",
                Major = "PE",
                Grades = new List<Grades>
                {
                    new Grades { SubjectName = "Math", Score = 85 },
                    new Grades { SubjectName = "Physics", Score = 90 },
                    new Grades { SubjectName = "History", Score = 78 },
                    new Grades { SubjectName = "PE", Score = 78 }
                },
                AverageGrade= 90,
            });
        }

        /// <summary>
        /// Adds a new student to the system
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public bool AddStudent(Student student)
        {
            student.Id = students.Any() ? students.Max(s => s.Id) + 1 : 1;
            students.Add(student);
            return true;
        }

        /// <summary>
        /// removes a student from the system
        /// </summary>
        /// <param name="student"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public bool DeleteStudent(Student student)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Returns all of the students currently in the system
        /// </summary>
        /// <returns></returns>
        public List<Student> GetAllStudents()
        {
            return students;
        }
    }
}
