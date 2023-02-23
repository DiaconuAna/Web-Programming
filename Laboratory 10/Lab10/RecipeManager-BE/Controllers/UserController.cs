using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipeManager.DTO;
using RecipeManager.Model;
using RecipeManager.Service;

using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RecipeManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService _service;

        public UserController(UserService service)
        {
            _service = service;
        }

        //[AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody]LoginRequest request)
        {
            //try
            //{
            //    var res = _service.Login(request.Username, request.Password);
            //    return Ok(res);
            //}
            //catch (Exception ex)
            //{
            //    return BadRequest(ex.Message);
            //}
            if (request == null)
                return BadRequest("Invalid client request");

            if (_service.Login(request.Username, request.Password))
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var sigingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokenOptions = new JwtSecurityToken(
                    issuer: "https://localhost:7042",
                    audience: "https://localhost:7042",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(10),
                    signingCredentials: sigingCredentials);

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(new { Token = tokenString });
            }
            return Unauthorized();
        }

        [HttpGet]
        [AllowAnonymous]
        //  List<UserIdDTO>
        public IActionResult GetUserIds()
        {
            try
            {
                var list = _service.getUserIds();
                return Ok(list);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
