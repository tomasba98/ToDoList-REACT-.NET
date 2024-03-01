using FormManager.Services.Services.DataAccessLayer;
using FormManager.Services.Services.DataAccessLayer.Implementation;
using Microsoft.EntityFrameworkCore;
using TodoList.Data;
using TodoList.Entities;
using TodoList.Services.TaskList;
using TodoList.Services.TaskList.Implementation;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
string? connectionString = builder.Configuration.GetConnectionString("DbConnection");

builder.Services.AddScoped<IGenericService<TaskEntity>, GenericService<TaskEntity>>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<TaskService>();


builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(policy =>
{
    policy.AllowAnyOrigin()
          .AllowAnyHeader()
          .AllowAnyMethod();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
