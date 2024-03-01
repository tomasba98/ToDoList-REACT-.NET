using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Data;
using TodoList.Entities;
using TodoList.Models;
using TodoList.Services.TaskList;

namespace TodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskListsController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskListsController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        private static TaskResponse TaskMapper (TaskEntity taskEntity)
        {
            return new TaskResponse()
            {
                Id = taskEntity.Id,
                Description = taskEntity.Description,
                Name = taskEntity.Name
            };
        }

        private static TaskEntity CreateTask(TaskRequest taskRequest)
        {
            return new TaskEntity()
            {
                Description = taskRequest.Description,
                Name = taskRequest.Name
            };
        }

        // GET
        [HttpGet]
        public ActionResult<IEnumerable<TaskResponse>> GetTasksList()
        {
            var tasks = _taskService.GetAllTasks();

           IEnumerable<TaskResponse> result = tasks.Select(TaskMapper).ToList();

            return Ok(result);
        }

        // GET ID
        [HttpGet("{id}")]
        public ActionResult<TaskResponse> GetTaskByIde(int taskId)
        {
            var task = _taskService.GetTaskById(taskId);
            
            if (task == null)
            {
                return BadRequest();
            }

            return Ok(TaskMapper(task));
        }

        
        // PUT
        [HttpPut("{taskId}")]
        public async Task<IActionResult> PutTaskList(int taskId, TaskRequest taskRequest)
        {
            var task = _taskService.GetTaskById(taskId);

            if (task == null)
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

        // POST
        [HttpPost]
        public ActionResult<TaskResponse> PostTaskList(TaskRequest taskRequest)
        {
            var task = CreateTask(taskRequest);

            var createdTask = _taskService.CreateTask(task);

            var responseTask = TaskMapper(createdTask);

            return Ok(responseTask);
        }

        // DELETE
        [HttpDelete("{taskId}")]
        public async Task<IActionResult> DeleteTaskList(int taskId)
        {
            var task = _taskService.GetTaskById(taskId);

            if (task == null)
            {
                return BadRequest();            }


            bool result = await _taskService.DeleteTask(task);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }
       
    }
}
