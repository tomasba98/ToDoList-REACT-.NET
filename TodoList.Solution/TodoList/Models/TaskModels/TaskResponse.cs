namespace TodoList.Models.TasksModels
{
    public class TaskResponse
    {
        public TaskResponse()
        {
            Name = string.Empty;
            Description = string.Empty;
        }
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
