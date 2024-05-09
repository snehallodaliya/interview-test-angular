using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StudentApi.Models.Students
{
    public class Grades
    {
        [Required(ErrorMessage = "Subject Name is required")]
        public string SubjectName { get; set; }

        [Range(0, 100, ErrorMessage = "Score must be between 0 and 100")]
        public int Score { get; set; }
    }
}