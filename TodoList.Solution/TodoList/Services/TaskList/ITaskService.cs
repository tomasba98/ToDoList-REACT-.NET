using TodoList.Entities.Task;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TodoList.Services.TaskList
{
    /// <summary>
    /// Defines the contract for a service that manages tasks.
    /// </summary>
    public interface ITaskService
    {
        /// <summary>
        /// Creates a new task.
        /// </summary>
        /// <param name="taskEntity">The task entity to be created.</param>
        /// <returns>The created task entity.</returns>
        TaskEntity CreateTask(TaskEntity taskEntity);

        /// <summary>
        /// Retrieves a task by its unique identifier.
        /// </summary>
        /// <param name="taskId">The identifier of the task to retrieve.</param>
        /// <returns>The task entity if found; otherwise, null.</returns>
        TaskEntity? GetTaskById(int taskId);

        /// <summary>
        /// Updates an existing task.
        /// </summary>
        /// <param name="taskEntity">The task entity to be updated.</param>
        /// <returns>True if the task was successfully updated; otherwise, false.</returns>
        Task<bool> UpdateTask(TaskEntity taskEntity);

        /// <summary>
        /// Deletes a task.
        /// </summary>
        /// <param name="taskEntity">The task entity to be deleted.</param>
        /// <returns>True if the task was successfully deleted; otherwise, false.</returns>
        Task<bool> DeleteTask(TaskEntity taskEntity);

        /// <summary>
        /// Retrieves all tasks associated with a user.
        /// </summary>
        /// <param name="userId">The identifier of the user whose tasks are to be retrieved.</param>
        /// <returns>An enumerable collection of task entities.</returns>
        IEnumerable<TaskEntity> GetAllTasks(int userId);
    }
}
