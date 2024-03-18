using FormManager.Services.Services.DataAccessLayer;

using TodoList.Entities.UserEntity;

namespace TodoList.Services.Users.Implementation;


public class UserService : IUserService
{
    private readonly IGenericService<User> _userGenericService;

    public UserService(IGenericService<User> userGenericService)
    {
        _userGenericService = userGenericService;
    }

    public bool CreateUser(User userEntity)
    {
        try
        {
            _userGenericService.Insert(userEntity);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public User? GetUserById(int userId)
    {
        return _userGenericService.FilterByExpression(user => user.Id == userId).FirstOrDefault();
    }

    public User? GetUserByName(string userName)
    {
        return _userGenericService.FilterByExpression(user => user.UserName == userName).FirstOrDefault();
    }


}
