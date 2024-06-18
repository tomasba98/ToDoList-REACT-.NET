using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using TodoList.Entities.UserEntity;

namespace TodoList.Entities.Task
{
    [Table("Tasks")]
    public class TaskEntity : EntityBase
    {
        public TaskEntity()
        {
            Name = string.Empty;
            Description = string.Empty;
            User = new User();
        }

        public TaskEntity(string name, string description, User user)
        {
            Name = name;
            Description = description;
            User = user;
            UserId = user.Id;
        }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Column("UserId")]
        public User User { get; set; }

        public int UserId { get; set; }
    }
}