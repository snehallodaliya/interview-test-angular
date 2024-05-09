using StudentApi.Models.Students;
using StudentApi.Services;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace StudentApi.Mediatr.Students;

public class AddStudentRequest : IRequest<Student>
{
    public Student Student { get; set; }
}

public class AddStudentHandler : IRequestHandler<AddStudentRequest, Student>
{
    private readonly IStudentsService _studentsService;

    public AddStudentHandler(IStudentsService studentsService)
    {
        _studentsService = studentsService;
    }

    public async Task<Student> Handle(AddStudentRequest request, CancellationToken cancellationToken)
    {
        return _studentsService.AddStudent(request.Student);
    }
}
