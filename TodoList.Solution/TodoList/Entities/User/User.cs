using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoList.Entities.UserEntity
{
    [Table("Users")]
    public class User : EntityBase
    {
        public User()
        {
            UserName = string.Empty;
            Password = string.Empty;
        }

        public User(string userName, string password)
        {
            UserName = userName;
            Password = password;
        }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}