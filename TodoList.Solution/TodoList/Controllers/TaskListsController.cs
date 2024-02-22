using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Data;
using TodoList.Models;

namespace TodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskListsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskListsController(AppDbContext context)
        {
            _context = context;
        }

        // GET
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskList>>> GetTasksList()
        {
            return await _context.TasksList.ToListAsync();
        }

        // GET ID
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskList>> GetTaskList(int id)
        {
            var taskList = await _context.TasksList.FindAsync(id);

            if (taskList == null)
            {
                return NotFound();
            }

            return taskList;
        }

        // PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskList(int id, TaskList taskList)
        {
            if (id != taskList.Id)
            {
                return BadRequest();
            }

            _context.Entry(taskList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST
        [HttpPost]
        public async Task<ActionResult<TaskList>> PostTaskList(TaskList taskList)
        {
            _context.TasksList.Add(taskList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskList", new { id = taskList.Id }, taskList);
        }

        // DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskList(int id)
        {
            var taskList = await _context.TasksList.FindAsync(id);
            if (taskList == null)
            {
                return NotFound();
            }

            _context.TasksList.Remove(taskList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskListExists(int id)
        {
            return _context.TasksList.Any(e => e.Id == id);
        }
    }
}
