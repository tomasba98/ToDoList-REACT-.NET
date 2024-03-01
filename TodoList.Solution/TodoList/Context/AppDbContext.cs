using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TodoList.Entities;

namespace TodoList.Data
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }       

        public virtual DbSet<TaskEntity> Tasks { get; set; }
        
    }
}
