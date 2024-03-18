using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TodoList.Entities.UserEntity;

namespace TodoList.Entities.Task
{
    /// <summary>
    /// Represents a task entity.
    /// </summary>
    [Table("Tasks")]
    public class TaskEntity : EntityBase
    {
        /// <summary>
        /// Gets or sets the name of the task.
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the description of the task.
        /// </summary>
        [Required]
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets the user associated with the task.
        /// </summary>
        [Required]
        [Column("UserId")]
        public User User { get; set; }

        /// <summary>
        /// Gets or sets the ID of the user associated with the task.
        /// </summary>
        public int UserId { get; set; }
    }
}
