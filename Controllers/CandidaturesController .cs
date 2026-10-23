using Microsoft.AspNetCore.Mvc;      // ControllerBase, ActionResult, attributs [HttpGet]...
using Microsoft.EntityFrameworkCore; // ToListAsync()
using SuiviStages.Data;              // AppDbContext
using SuiviStages.Models;            // Candidature

namespace SuiviStages.Controllers
{
    // [ApiController] : cette classe est un contrôleur d'API
    [ApiController]
    // [Route] : l'adresse. [controller] est remplacé par le nom de la classe
    // sans "Controller", donc ici : /api/candidatures
    [Route("api/[controller]")]
    public class CandidaturesController : ControllerBase
    {
        // Un champ privé qui garde le contexte de base de données (détail interne)
        private readonly AppDbContext _context;

        // ASP.NET Core fournit tout seul l'AppDbContext enregistré dans Program.cs
        // (injection de dépendances) et on le range dans le champ.
        public CandidaturesController(AppDbContext context)
        {
            _context = context;
        }

        // [HttpGet] : cette méthode répond aux requêtes GET sur /api/candidatures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Candidature>>> GetCandidatures()
        {
            return await _context.Candidatures.ToListAsync();
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Candidature>> GetCandidature(int id)
        {
            var candidature = await _context.Candidatures.FindAsync(id);

            if (candidature == null)
            {
                return NotFound();
            }

            return candidature;
        }



        [HttpPost]
        public async Task<ActionResult<Candidature>> CreateCandidature(Candidature c)
        {
            c.DateCandidature = DateTime.UtcNow;
            _context.Candidatures.Add(c);
            await _context.SaveChangesAsync();
            return Ok(c);
        }

        [HttpDelete("{id}")]

        public async Task<ActionResult<Candidature>> DeleteCandidature(int id)
        {
            var c =  await _context.Candidatures.FindAsync(id);

            if (c == null)
            {
                return NotFound();
            }

            else
            {
                _context.Candidatures.Remove(c);
                await _context.SaveChangesAsync();

                return Ok(c);
            
            }

        }
    }
}