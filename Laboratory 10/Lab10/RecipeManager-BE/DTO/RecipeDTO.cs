namespace RecipeManager.DTO
{
    public class RecipeDTO
    {
        public RecipeDTO(int id, string name, string description, string firstName, string lastName, string typeDescr)
        {
            Id = id;
            Name = name;
            Description = description;
            FirstName = firstName;
            LastName = lastName;
            this.typeDescr = typeDescr;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string typeDescr { get; set; }

    }
}
