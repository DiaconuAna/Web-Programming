﻿namespace RecipeManager.Model
{
    public class Author
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public List<Recipe> recipes { get; set; }
    }
}
