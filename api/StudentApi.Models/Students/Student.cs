using System.Collections.Generic;

namespace StudentApi.Models.Students
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Major { get; set; }
        public List<Grades> Grades { get; set; } = new List<Grades>();
        public double AverageGrade { get; set; }
    }
}
