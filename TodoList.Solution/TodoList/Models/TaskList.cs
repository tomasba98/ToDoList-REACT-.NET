namespace TodoList.Models
{
    public class TaskList
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
    }
}
