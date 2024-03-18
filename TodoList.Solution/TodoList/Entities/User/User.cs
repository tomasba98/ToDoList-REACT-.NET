using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoList.Entities.UserEntity
{
    /// <summary>
    /// Represents a user entity.
    /// </summary>
    [Table("Users")]
    public class User : EntityBase
    {
        /// <summary>
        /// Gets or sets the username of the user.
        /// </summary>
        [Required]
        public string UserName { get; set; }

        /// <summary>
        /// Gets or sets the password of the user.
        /// </summary>
        [Required]
        public string Password { get; set; }
    }
}
