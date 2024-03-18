namespace TodoList.Models.TasksModels
{
    /// <summary>
    /// Represents a request for a task.
    /// </summary>
    public class TaskRequest
    {
        /// <summary>
        /// Gets or sets the name of the task.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the description of the task.
        /// </summary>
        public string Description { get; set; }
    }
}
