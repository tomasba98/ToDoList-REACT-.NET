﻿namespace TodoList.Models.TasksModels;

public class TaskRequest
{
    public required string Name { get; set; }
    public required string Description { get; set; }
}