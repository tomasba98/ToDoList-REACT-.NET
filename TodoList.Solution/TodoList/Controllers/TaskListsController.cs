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
    /// <summary>
    /// Controller for managing tasks.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskListsController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserService _userService;

        /// <summary>
        /// Initializes a new instance of the <see cref="TaskListsController"/> class.
        /// </summary>
        /// <param name="taskService">The task service.</param>
        /// <param name="httpContextAccessor">The HTTP context accessor.</param>
        /// <param name="userService">The user service.</param>
        public TaskListsController(ITaskService taskService, IHttpContextAccessor httpContextAccessor, IUserService userService)
        {
            _taskService = taskService;
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
            _userService = userService;
        }

        /// <summary>
        /// Gets the user ID from the authentication token.
        /// </summary>
        /// <returns>The user ID if found, otherwise null.</returns>
        private int? GetUserIdFromToken()
        {
            Claim userIdClaim = _httpContextAccessor.HttpContext.User.FindFirst("UserId");
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return null;
            }
            return userId;
        }

        /// <summary>
        /// Validates the user ID.
        /// </summary>
        /// <param name="userId">The user ID to validate.</param>
        /// <returns>True if the user ID is valid, otherwise false.</returns>
        private bool ValidateUserId(int userId)
        {
            if (_userService.GetUserById(userId) == null)
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Gets a task by its ID.
        /// </summary>
        /// <param name="taskId">The ID of the task to retrieve.</param>
        /// <returns>The task entity.</returns>
        private TaskEntity GetTaskById(int taskId)
        {
            return _taskService.GetTaskById(taskId);
        }

        /// <summary>
        /// Maps a task entity to a DTO.
        /// </summary>
        /// <param name="taskEntity">The task entity to map.</param>
        /// <returns>The mapped task DTO.</returns>
        private TaskResponse MapToDto(TaskEntity taskEntity)
        {
            return new TaskResponse
            {
                Id = taskEntity.Id,
                Name = taskEntity.Name,
                Description = taskEntity.Description
            };
        }

        /// <summary>
        /// Gets a list of tasks for the authenticated user.
        /// </summary>
        /// <returns>A list of tasks.</returns>
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

        /// <summary>
        /// Gets a task by its ID.
        /// </summary>
        /// <param name="id">The ID of the task to retrieve.</param>
        /// <returns>The task with the specified ID.</returns>
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

        /// <summary>
        /// Updates a task.
        /// </summary>
        /// <param name="id">The ID of the task to update.</param>
        /// <param name="taskRequest">The updated task information.</param>
        /// <returns>An action result representing the operation result.</returns>
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

        /// <summary>
        /// Creates a new task.
        /// </summary>
        /// <param name="taskRequest">The task information to create.</param>
        /// <returns>The created task.</returns>
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

        /// <summary>
        /// Deletes a task by its ID.
        /// </summary>
        /// <param name="id">The ID of the task to delete.</param>
        /// <returns>An action result representing the operation result.</returns>
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
