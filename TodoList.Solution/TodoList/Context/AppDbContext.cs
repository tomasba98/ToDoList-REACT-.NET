using Microsoft.EntityFrameworkCore;
using TodoList.Entities.Task;
using TodoList.Entities.UserEntity;

namespace TodoList.Data
{
    /// <summary>
    /// Represents the application's database context.
    /// </summary>
    public class AppDbContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AppDbContext"/> class.
        /// </summary>
        /// <param name="options">The options to be used by the context.</param>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        /// <summary>
        /// Gets or sets the database set for tasks.
        /// </summary>
        public virtual DbSet<TaskEntity> Tasks { get; set; }

        /// <summary>
        /// Gets or sets the database set for users.
        /// </summary>
        public virtual DbSet<User> Users { get; set; }
    }
}
