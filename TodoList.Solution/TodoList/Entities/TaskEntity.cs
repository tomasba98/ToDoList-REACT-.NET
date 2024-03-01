using System.ComponentModel.DataAnnotations.Schema;

namespace TodoList.Entities
{
    [Table("Tasks")]
    public class TaskEntity : EntityBase
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
    }
}
