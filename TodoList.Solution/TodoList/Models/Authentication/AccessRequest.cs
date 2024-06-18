namespace TodoList.Models.UserModels
{
    public class AccessRequest
    {
        public AccessRequest()
        {
            UserName = string.Empty;
            Password = string.Empty;
        }

        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
