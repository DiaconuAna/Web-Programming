using RecipeManager.Context;
using RecipeManager.DTO;
using RecipeManager.Model;
using Type = RecipeManager.Model.Type;

namespace RecipeManager.Service
{
    public class RecipeService
    {


        private RecipeContext _context;


        public RecipeService(RecipeContext ctx)
        {
            _context = ctx;
        }

        public Recipe AddRecipe(RecipeDTO recipe)
        {
            // check for invalid input - throw exceptions if type or author is null

            Author author = _context.Authors.FirstOrDefault(a => a.FirstName == recipe.FirstName && a.LastName == recipe.LastName);
            Type type = _context.Types.FirstOrDefault(t => t.typeDescr == recipe.typeDescr);

            Recipe new_recipe = new Recipe(author.Id,type.Id,recipe.Name,recipe.Description) ;
            _context.Recipes.Add(new_recipe);
            _context.SaveChanges();
            return new_recipe;
        }

        public List<Recipe> GetAll()
        {
            return _context.Recipes.ToList();
        }

        public List<RecipeDTO> GetAllWithDetails()
        {
            List<RecipeDTO> result = new List<RecipeDTO>();
            List<Recipe> recipes = _context.Recipes.ToList();

            foreach(Recipe r in recipes)
            {
                Author a = _context.Authors.SingleOrDefault(a => a.Id == r.AuthorId);
                Type t = _context.Types.SingleOrDefault(t => t.Id == r.TypeId);

                result.Add(new RecipeDTO(r.Id, r.Name, r.Description, a.FirstName, a.LastName, t.typeDescr));
            }

            return result;
        }
        public List<Recipe> GetAllFiltered(string filter)
        {
            return _context.Recipes.Where(d => d.type.typeDescr.Contains(filter)).ToList();
        }

        public List<RecipeDTO> GetAllFilteredWithDetails(string filter)
        {
            List<Recipe> recipes = this.GetAllFiltered(filter);
            List<RecipeDTO> result = new List<RecipeDTO>();

            foreach (Recipe r in recipes)
            {
                Author a = _context.Authors.SingleOrDefault(a => a.Id == r.AuthorId);
                Type t = _context.Types.SingleOrDefault(t => t.Id == r.TypeId);

                result.Add(new RecipeDTO(r.Id, r.Name, r.Description, a.FirstName, a.LastName, t.typeDescr));
            }

            return result;
        }

        public List<TypeDTO> GetTypes()
        {
            var res = _context.Types.Select(t => t.typeDescr ).ToList();
            List<TypeDTO> result = new List<TypeDTO>();

            foreach(var r in res)
            {
                Console.WriteLine(r);
                TypeDTO t = new TypeDTO(r);
                result.Add(t);
                
            }
            return result;
        }

        public List<AuthorDTO> GetAuthors()
        {
            var res = _context.Authors.Select(t => new { t.FirstName, t.LastName}).ToList();
            List<AuthorDTO> result = new List<AuthorDTO>();

            foreach(var r in res)
            {
                AuthorDTO a = new AuthorDTO(r.FirstName, r.LastName);
                result.Add(a);
            }

            return result;
        }

        public List<RecipeDTO> GetFilteredByType(string TypeId)
        {
            var recipes = _context.Recipes.Where(r => r.type.typeDescr == TypeId).ToList();

            List<RecipeDTO> result = new List<RecipeDTO>();

            foreach (Recipe r in recipes)
            {
                Author a = _context.Authors.SingleOrDefault(a => a.Id == r.AuthorId);
                Type t = _context.Types.SingleOrDefault(t => t.Id == r.TypeId);

                result.Add(new RecipeDTO(r.Id, r.Name, r.Description, a.FirstName, a.LastName, t.typeDescr));
            }

            return result;

        }

        public Recipe DeleteRecipe(int id)
        {
            Recipe recipe = _context.Recipes.FirstOrDefault(r => r.Id == id);

            if (recipe == null)
                throw new Exception("Invalid recipe");

            _context.Recipes.Remove(recipe);
            _context.SaveChanges();

            return recipe;
        }

        public Recipe UpdateRecipe(RecipeDTO recipe)
        {
            if (recipe.LastName == null || recipe.FirstName == null || recipe.typeDescr == null)
                throw new Exception("Invalid input");


            Author author = _context.Authors.FirstOrDefault(a => a.FirstName == recipe.FirstName && a.LastName == recipe.LastName);
            Type type = _context.Types.FirstOrDefault(t => t.typeDescr == recipe.typeDescr);

            Recipe updated = _context.Recipes.FirstOrDefault(r => r.Id == recipe.Id);

            if (updated == null)
                throw new Exception("Invalid recipe");

            //updated.TypeId = type.Id;
            //updated.AuthorId = author.Id;
            updated.Description = recipe.Description;
            //updated.Name = recipe.Name;
            //updated.author = author;
            //updated.type = type;

            _context.Recipes.Update(updated);
            _context.SaveChanges();
            return updated;
        }
    }
}
