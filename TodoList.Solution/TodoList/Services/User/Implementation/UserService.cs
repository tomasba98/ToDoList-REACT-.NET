using TodoList.Entities.UserEntity;
using TodoList.Services.DataAccessLayer;

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
            _userGenericService.InsertAsync(userEntity);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public User? GetUserById(int userId)
    {
        return _userGenericService.FilterByExpressionLinq(user => user.Id == userId).FirstOrDefault();
    }

    public User? GetUserByName(string userName)
    {
        return _userGenericService.FilterByExpressionLinq(user => user.UserName == userName).FirstOrDefault();
    }


}
