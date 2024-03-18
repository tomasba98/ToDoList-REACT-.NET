namespace TodoList.Models.TasksModels
{
    /// <summary>
    /// Represents a response for a task.
    /// </summary>
    public class TaskResponse
    {
        /// <summary>
        /// Gets or sets the ID of the task.
        /// </summary>
        public int Id { get; set; }

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
