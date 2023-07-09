using RecipeManager.Context;
using RecipeManager.DTO;
using RecipeManager.Model;

namespace RecipeManager.Service
{
    public class UserService
    {
        private RecipeContext _context;

        public UserService(RecipeContext context)
        {
            _context = context;
        }

        public bool Login(string username, string password)
        {
            User user = _context.Users.FirstOrDefault(u => u.Username == username);

            if (user == null)
                return false;
            //throw new Exception("Invalid user");

            //throw new Exception("User doesn't exist!");

            if (password == user.Password)
                return true;

            return false;
           // throw new Exception("Invalid input!");
        }

        public List<UserIdDTO> getUserIds()
        {
            var userIds = _context.Users.Select(u => u.Id).ToList();
            var results = new List<UserIdDTO>();

            foreach(var u in userIds)
            {
                UserIdDTO user = new UserIdDTO(u);
                results.Add(user);
            }

            return results;
        }
    }
}
