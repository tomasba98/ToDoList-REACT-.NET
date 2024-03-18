using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using TodoList.Entities.UserEntity;
using TodoList.Models.UserModels;
using TodoList.Services.Authentication;
using TodoList.Services.Users;

namespace TodoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        private readonly IUserService _userService;

        public AuthenticationController(IAuthenticationService authenticationService, IUserService userService)
        {
            _authenticationService = authenticationService;
            _userService = userService;
        }

        [HttpPost("Register")]

        public IActionResult Register(AccessRequest request)
        {

            User newUser = new()
            {
                UserName = request.UserName,
                Password = request.Password
            };

            bool result = _userService.CreateUser(newUser);

            return result ? Ok() : BadRequest("Something went wrong.");
        }

        [HttpPost("Login")]

        public IActionResult Login(AccessRequest request)
        {
            User? user = _userService.GetUserByName(request.UserName);

            if (user is null)
            {
                return BadRequest("Invalid Credential");
            }

            if (!ValidatePassword(user.Password, request.Password))
            {
                return BadRequest("Invalid Credential");
            }

            AuthenticationResponse response = _authenticationService.GenerateJwt(user);

            return Ok(response);

        }

        private bool ValidatePassword(string password, string passwordRequest)
        {
            return password.Equals(passwordRequest);
        }
    }
}
