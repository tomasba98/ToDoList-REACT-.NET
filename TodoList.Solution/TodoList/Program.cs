using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using System.Text;

using TodoList.Data;
using TodoList.Entities.Task;
using TodoList.Entities.UserEntity;
using TodoList.Services.Authentication;
using TodoList.Services.Authentication.Implementation;
using TodoList.Services.DataAccessLayer;
using TodoList.Services.DataAccessLayer.Implementation;
using TodoList.Services.TaskList;
using TodoList.Services.TaskList.Implementation;
using TodoList.Services.Users;
using TodoList.Services.Users.Implementation;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.
string? connectionString = builder.Configuration.GetConnectionString("DbConnection");

// Register services for task-related operations.
builder.Services.AddScoped<IGenericService<TaskEntity>, GenericService<TaskEntity>>();
builder.Services.AddScoped<ITaskService, TaskService>();

// Register services for user-related operations.
builder.Services.AddScoped<IGenericService<User>, GenericService<User>>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IUserService, UserService>();

// Configure the database context with PostgreSQL.
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

// Add controllers, API explorer, Swagger, and HttpContextAccessor.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();

// Add CORS for cross-origin resource sharing.
builder.Services.AddCors();

// Configure JWT-based authentication.
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "Bearer";
}).AddJwtBearer("Bearer", options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "ToDoList",
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("!£@0#y~9I1.p0goq1£1+12345678901234567890123456789012"))
    };
});

// Configure Swagger documentation.
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = builder.Configuration["Swagger:Title"],
        Version = builder.Configuration["Swagger:Version"],
    });

    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

WebApplication app = builder.Build();

// Enable CORS for specified origins.
app.UseCors(policy =>
{
    policy.WithOrigins("http://localhost:5173")
          .AllowAnyHeader()
          .AllowAnyMethod()
          .AllowCredentials();
});

// Configure middleware components.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
