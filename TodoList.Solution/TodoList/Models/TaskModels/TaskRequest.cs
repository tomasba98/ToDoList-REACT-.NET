namespace TodoList.Models.TasksModels
{
    public class TaskRequest
    {
        public TaskRequest()
        {
            Name = string.Empty;
            Description = string.Empty;
        }
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
