namespace RecipeManager.DTO
{
    public class AuthorDTO
    {
        public AuthorDTO(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
