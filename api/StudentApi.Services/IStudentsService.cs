using StudentApi.Models.Students;
using System.Collections.Generic;

namespace StudentApi.Services
{
    public interface IStudentsService
    {
        List<Student> GetAllStudents();

        Student AddStudent(Student student);

        bool DeleteStudent(int studentId);
    }
}
