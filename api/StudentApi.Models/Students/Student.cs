using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudentApi.Models.Students
{
    public class Student
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }
        
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Major is required")]
        public string Major { get; set; }
        public List<Grades> Grades { get; set; } = new List<Grades>();
        public double AverageGrade { get; set; }
    }
}
