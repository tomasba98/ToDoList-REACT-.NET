using TodoList.Entities.UserEntity;

namespace TodoList.Services.Users;

public interface IUserService
{
    bool CreateUser(User userEntity);

    User? GetUserByName(string userName);

    User? GetUserById(int userId);
}
