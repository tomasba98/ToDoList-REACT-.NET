﻿namespace TodoList.Models.TasksModels;

public class TaskResponse
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }
}
