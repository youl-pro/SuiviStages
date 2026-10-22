namespace SuiviStages.Models
{
    public class Candidature
    {
        public int Id { get; set; }
        public string Entreprise { get; set; } = string.Empty;
        public string Poste { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Notes  { get; set; } = string.Empty;
        public DateTime DateCandidature { get; set; }
        public string? Lien { get; set; }  

    }
}
