using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using System.Security.Claims;

using TodoList.Entities.Task;
using TodoList.Entities.UserEntity;
using TodoList.Models.TasksModels;
using TodoList.Services.TaskList;
using TodoList.Services.Users;

namespace TodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskListsController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserService _userService;

        public TaskListsController(ITaskService taskService, IHttpContextAccessor httpContextAccessor, IUserService userService)
        {
            _taskService = taskService;
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
            _userService = userService;
        }

        private int? GetUserIdFromToken()
        {
            Claim userIdClaim = _httpContextAccessor.HttpContext.User.FindFirst("UserId");
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return null;
            }
            return userId;
        }

        private bool ValidateUserId(int userId)
        {
            if (_userService.GetUserById(userId) == null)
            {
                return false;
            }
            return true;
        }

        private TaskEntity GetTaskById(int taskId)
        {
            return _taskService.GetTaskById(taskId);
        }

        private TaskResponse MapToDto(TaskEntity taskEntity)
        {
            return new TaskResponse
            {
                Id = taskEntity.Id,
                Name = taskEntity.Name,
                Description = taskEntity.Description
            };
        }

        [HttpGet]
        public ActionResult<IEnumerable<TaskResponse>> GetTasksList()
        {
            int? userId = GetUserIdFromToken();
            if (!userId.HasValue)
            {
                return BadRequest();
            }

            IEnumerable<TaskEntity> tasks = _taskService.GetAllTasks(userId.Value);
            IEnumerable<TaskResponse> result = tasks.Select(taskEntity => MapToDto(taskEntity)).ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult<TaskResponse> GetTask(int id)
        {
            int? userId = GetUserIdFromToken();
            if (!userId.HasValue)
            {
                return BadRequest();
            }

            TaskEntity task = GetTaskById(id);
            if (task == null || task.UserId != userId.Value)
            {
                return BadRequest();
            }

            return Ok(MapToDto(task));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskRequest taskRequest)
        {
            int? userId = GetUserIdFromToken();
            if (!userId.HasValue || !ValidateUserId(userId.Value))
            {
                return BadRequest();
            }

            TaskEntity task = GetTaskById(id);
            if (task == null || task.UserId != userId.Value)
            {
                return BadRequest();
            }

            task.Name = taskRequest.Name;
            task.Description = taskRequest.Description;

            bool result = await _taskService.UpdateTask(task);
            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost]
        public ActionResult<TaskResponse> CreateTask(TaskRequest taskRequest)
        {
            int? userId = GetUserIdFromToken();
            if (!userId.HasValue || !ValidateUserId(userId.Value))
            {
                return BadRequest();
            }

            User? user = _userService.GetUserById(userId.Value);

            if (user is null)
            {
                return BadRequest();
            }

            TaskEntity task = new()
            {
                Description = taskRequest.Description,
                Name = taskRequest.Name,
                UserId = userId.Value,
                User = user

            };

            TaskEntity createdTask = _taskService.CreateTask(task);
            if (createdTask == null)
            {
                return BadRequest("Can't create the task");
            }

            return Ok(MapToDto(createdTask));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            int? userId = GetUserIdFromToken();
            if (!userId.HasValue || !ValidateUserId(userId.Value))
            {
                return BadRequest();
            }

            TaskEntity task = GetTaskById(id);
            if (task == null || task.UserId != userId.Value)
            {
                return BadRequest();
            }

            bool result = await _taskService.DeleteTask(task);
            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
