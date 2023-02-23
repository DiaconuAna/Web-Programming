using Microsoft.EntityFrameworkCore;
using RecipeManager.Model;
using Type = RecipeManager.Model.Type;

namespace RecipeManager.Context
{
    public class RecipeContext : DbContext
    {
        public DbSet<Recipe> Recipes { get; set; }

        public DbSet<Author> Authors { get; set; }

        public DbSet<Type> Types { get; set;  }

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=RecipeManager;Trusted_Connection=True;");
        }
    }
}
