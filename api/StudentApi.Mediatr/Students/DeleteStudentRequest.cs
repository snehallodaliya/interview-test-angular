using StudentApi.Models.Students;
using StudentApi.Services;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace StudentApi.Mediatr.Students;

public class DeleteStudentRequest : IRequest<bool>
{
    public int StudentId { get; set; }
}

public class DeleteStudentHandler : IRequestHandler<DeleteStudentRequest, bool>
{
    private readonly IStudentsService _studentsService;

    public DeleteStudentHandler(IStudentsService studentsService)
    {
        _studentsService = studentsService;
    }

    public async Task<bool> Handle(DeleteStudentRequest request, CancellationToken cancellationToken)
    {
        return _studentsService.DeleteStudent(request.StudentId);
    }
}
