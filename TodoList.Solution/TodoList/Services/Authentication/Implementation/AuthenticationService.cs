using TodoList.Entities.UserEntity;
using TodoList.Models.UserModels;
using TodoList.Utils;

namespace TodoList.Services.Authentication.Implementation;
public class AuthenticationService : IAuthenticationService
{

    public AuthenticationService()
    {

    }

    public AuthenticationResponse GenerateJwt(User user)
    {

        string token = Encrypt.GenerateToken(user);

        return new AuthenticationResponse(user.UserName, token);
    }

}
