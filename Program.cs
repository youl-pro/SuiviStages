using Microsoft.EntityFrameworkCore;   // donne accès à UseNpgsql
using SuiviStages.Data;                // pour retrouver AppDbContext



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// On enregistre AppDbContext dans le conteneur de services d'ASP.NET Core.
// Ensuite, tout contrôleur qui le demande dans son constructeur le recevra tout seul
// (c'est l'injection de dépendances).
builder.Services.AddDbContext<AppDbContext>(options =>
    // UseNpgsql = "ce contexte parle à PostgreSQL"
    // GetConnectionString lit la valeur ConnectionStrings > DefaultConnection
    // de vos secrets utilisateur (le mot de passe n'est donc pas dans le code)
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));





// On définit une politique CORS nommée "ReactDev".
// Elle autorise les demandes venant de l'adresse du serveur de développement
// de React (Vite : http://localhost:5173), avec n'importe quel en-tête et
// n'importe quelle méthode (GET, POST, DELETE...).
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactDev", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// On active la politique CORS définie plus haut
app.UseCors("ReactDev");

app.UseAuthorization();

app.MapControllers();

app.Run();
