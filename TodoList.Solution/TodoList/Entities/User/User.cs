using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoList.Entities.UserEntity;

[Table("Users")]
public class User : EntityBase
{
    [Required]
    public required string UserName { get; set; }

    [Required]
    public required string Password { get; set; }
}
