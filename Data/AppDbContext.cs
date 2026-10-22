using SuiviStages.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SuiviStages.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options) { }

        public DbSet <Candidature> Candidatures { get; set; }
    }
}