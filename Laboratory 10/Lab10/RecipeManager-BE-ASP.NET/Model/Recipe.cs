namespace RecipeManager.Model
{
    public class Recipe
    {


        public Recipe(int AuthorId, int TypeId, string Name, string Description)
        {
            this.AuthorId = AuthorId;
            this.TypeId = TypeId;
            this.Name = Name;
            this.Description = Description;
            
        }

        public int Id { get; set; }
        public int AuthorId { get; set; }

        public int TypeId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Author author { get; set; }

        public Type type { get; set; }
           
    }
}
