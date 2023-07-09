using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipeManager.DTO;
using RecipeManager.Model;
using RecipeManager.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RecipeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {

        private RecipeService _service;

        public RecipesController(RecipeService srv)
        {
            _service = srv;
        }
        // GET: api/<RecipesController>
        [HttpGet]
        [Authorize]
        public List<RecipeDTO> GetRecipes()
        {
            return _service.GetAllWithDetails();
        }

        [HttpPost("filter")]
        //[AllowAnonymous]
        [Authorize]

        public List<RecipeDTO> GetFilteredRecipes(FilterDTO filter)
        {
            return _service.GetAllFilteredWithDetails(filter.filter);
        }

        [HttpPost("filterType")]
        [Authorize]

        // [AllowAnonymous]
        public List<RecipeDTO> GetFilteredByType(FilterTypeDTO filter)
        {
            return _service.GetFilteredByType(filter.TypeId);
        }

        [HttpGet("types")]
        [Authorize]

        //[AllowAnonymous]
        public List<TypeDTO> GetTypes()
        {
            return _service.GetTypes();
        }

        [HttpGet("authors")]
        [Authorize]

        //[AllowAnonymous]
        public List<AuthorDTO> getAuthors()
        {
            return _service.GetAuthors();
        }

        //[AllowAnonymous]
        [Authorize]
        [HttpPost("add")]
        public Recipe AddRecipe(RecipeDTO recipe)
        {
            return _service.AddRecipe(recipe);
        }

        //[AllowAnonymous]
        [HttpPost("delete")]
        [Authorize]

        public Recipe DeleteRecipe(DeleteDTO dto)
        {
            Console.WriteLine("Recipe id - ", dto.Id);
            return _service.DeleteRecipe(dto.Id);
        }

       // [AllowAnonymous]
        [HttpPost("update")]
        [Authorize]

        public Recipe UpdateRecipe(RecipeDTO recipe)
        {
            return _service.UpdateRecipe(recipe);
        }
    }
}
