namespace TodoList.Models.UserModels
{
    public class AuthenticationResponse
    {

        public AuthenticationResponse(string userName, string token)
        {
            UserName = userName;
            Token = token;
        }


        public string UserName { get; set; }

        public string Token { get; set; }
    }
}
