using TodoList.Entities.UserEntity;
using TodoList.Models.UserModels;

namespace TodoList.Services.Authentication;


public interface IAuthenticationService
{
    AuthenticationResponse GenerateJwt(User user);
}
