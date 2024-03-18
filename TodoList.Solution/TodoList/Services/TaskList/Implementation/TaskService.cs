using FormManager.Services.Services.DataAccessLayer;

using TodoList.Entities.Task;

namespace TodoList.Services.TaskList.Implementation
{
    public class TaskService : ITaskService
    {
        private readonly IGenericService<TaskEntity> _taskGenericService;

        public TaskService(IGenericService<TaskEntity> taskGenericService)
        {
            _taskGenericService = taskGenericService;
        }

        public TaskEntity CreateTask(TaskEntity taskEntity)
        {
            _taskGenericService.Insert(taskEntity);
            return taskEntity;
        }

        public async Task<bool> DeleteTask(TaskEntity taskEntity)
        {
            try
            {
                await _taskGenericService.DeleteAsync(taskEntity);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public TaskEntity? GetTaskById(int taskId)
        {
            return _taskGenericService.FilterByExpression(taskEntity => taskEntity.Id == taskId).FirstOrDefault();
        }

        public async Task<bool> UpdateTask(TaskEntity taskEntity)
        {
            try
            {
                await _taskGenericService.UpdateAsync(taskEntity);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public IEnumerable<TaskEntity> GetAllTasks(int userId)
        {
            return _taskGenericService.FilterByExpression(taskEntity => taskEntity.UserId == userId).ToList();
        }
    }
}
