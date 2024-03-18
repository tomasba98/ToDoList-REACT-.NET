using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using TodoList.Entities.UserEntity;

namespace TodoList.Entities.Task;

[Table("Tasks")]
public class TaskEntity : EntityBase
{
    [Required]
    public required string Name { get; set; }

    [Required]
    public required string Description { get; set; }

    [Required]
    [Column("UserId")]
    public required User User { get; set; }

    public required int UserId { get; set; }
}
