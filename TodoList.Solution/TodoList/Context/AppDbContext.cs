using Microsoft.EntityFrameworkCore;

using TodoList.Entities.Task;
using TodoList.Entities.UserEntity;

namespace TodoList.Data
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public virtual DbSet<TaskEntity> Tasks { get; set; }

        public virtual DbSet<User> Users { get; set; }

    }
}
