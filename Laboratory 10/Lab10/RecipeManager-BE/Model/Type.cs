namespace RecipeManager.Model
{
    public class Type
    {
        public int Id { get; set; }
        public string typeDescr { get; set;  }
        public List<Recipe> recipes { get; set; }

    }
}
