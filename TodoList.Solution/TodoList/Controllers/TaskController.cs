using Microsoft.AspNetCore.Mvc;

namespace TodoList.Controllers
{
    [ApiController]
    [Route("task")]
    public class TaskController : ControllerBase
    {

        [HttpGet]
        [Route("show")]

        public dynamic ShowTasks() 
        {
            return Task.FromResult(0); //nashe nose qe es
        }

        [HttpPost]
        [Route("add")]

        public dynamic addTask(Task task)
        {
            return new
            {
                success = true,
                message = "Task Added",
                result = task
            };
        }

        [HttpPost]
        [Route("delete")]

        public dynamic deleteTask(Task task)
        {
            string? token = Request.Headers.Where(x => x.Key == "Authorization").FirstOrDefault().Value;

            if(token != "xxx")
            {
                return new
                {
                    success = false,
                    message = "no sos vos",
                    result = ""
                };
            }

            return new
            {
                success = true,
                message = "Task Deleted",
                result = task
            };

        }

    }
}
