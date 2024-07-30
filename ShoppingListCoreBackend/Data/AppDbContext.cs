using Microsoft.EntityFrameworkCore;
using ShoppingListBackend.Model;
using System.Reflection;

namespace ShoppingListBackend.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "מוצרי חלב" },
                new Category { Id = 2, Name = "ירקות ופירות" },
                new Category { Id = 3, Name = "בשר ודגים" },
                new Category { Id = 4, Name = "מוצרי ים" },
                new Category { Id = 5, Name = "טואלטיקה" },
                new Category { Id = 6, Name = "מוצרי ניקוי" },
                new Category { Id = 7, Name = "מוצרי ילדים" }
                );
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

       
    }
}
