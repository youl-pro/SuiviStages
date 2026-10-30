
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function FormulaireCandidature({ setCandidatures, fermerFormulaire,  candidatureAmodifiee}) {
  const [entreprise, setEntreprise] = useState('');
  const [poste, setPoste] = useState('');
  const [status, setStatus] = useState('');


useEffect(() =>{

  if (!candidatureAmodifiee )
  {
     return
  }
else 
{
  setEntreprise(candidatureAmodifiee.entreprise);
  setPoste(candidatureAmodifiee.poste);
  setStatus(candidatureAmodifiee.status);
}

}, [candidatureAmodifiee])


  // ajouter une candidature.
  async function ajoutCandidature() {
    try {
      const reponse = await fetch(
        'https://localhost:7092/api/candidatures',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            entreprise: entreprise,
            poste: poste,
            status: status
          })
        }
      );

      if (!reponse.ok) {
        throw new Error("Erreur lors de l'ajout");
      }

      const candidatureCree = await reponse.json();

      setCandidatures(prev => [...prev, candidatureCree]);

      setEntreprise('');
      setPoste('');
      setStatus('');
      fermerFormulaire();

    } catch (erreur) {
      console.error("Erreur lors de l'ajout :", erreur);
    }
  }



  // Modifier une candidature
async function modifierCandidature(c){
try 
{
  const reponse = await fetch(`https://localhost:7092/api/candidatures/${c.id}`, {

 method : 'PUT', 

 headers :  {
            'Content-Type': 'application/json'
          },

          body : JSON.stringify({
          entreprise : entreprise,
          poste : poste,
          status :  status,
})

})
if(!reponse.ok){

 throw new Error ("Erreur lors du modification !");

}
 const candidatAModifie =  await reponse.json();

setCandidatures(prev=> prev.map(p => p.id === candidatAModifie.id ? candidatAModifie : p ))

fermerFormulaire();
}
catch(erreur)
{
    console.error("Erreur lors de la modification: ", erreur);
}


}

  return (
    <div className="container mt-5">
      <div
        className="card bg-black text-white border-secondary shadow mx-auto"
        style={{ maxWidth: '650px' }}
      >
        <div className="card-body p-4 p-md-5">

          {/* Titre et description */}
          <div className="mb-4">
            {candidatureAmodifiee ?  (<h2
              className="fw-bold mb-2"
              style={{ color: 'tomato' }}
            >
            Modifier une candidature
            </h2>  
) : (  <h2
              className="fw-bold mb-2"
              style={{ color: 'tomato' }}
            >
            Ajouter une candidature
            </h2>  )  }
{/* =============================================*/}

            <p className="text-white-50 mb-0">
              Renseignez les informations du poste
            </p>
          </div>

          <form
            onSubmit={(e) => {
               e.preventDefault();
              if(candidatureAmodifiee){
                
                  modifierCandidature(candidatureAmodifiee);
              }
              else{
              ajoutCandidature();
              }
            
         
            }}
          >
            {/* Champ Entreprise */}
            <div className="mb-3">
              <label
                htmlFor="entreprise"
                className="form-label fw-semibold"
                style={{ color: 'tomato' }}
              >
                Entreprise
              </label>

              <input
                id="entreprise"
                className="form-control bg-white text-dark"
                type="text"
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
                placeholder="Nom de l'entreprise"
                required
              />
            </div>

            {/* Champ Poste */}
            <div className="mb-3">
              <label
                htmlFor="poste"
                className="form-label fw-semibold"
                style={{ color: 'tomato' }}
              >
                Poste
              </label>

              <input
                id="poste"
                className="form-control bg-white text-dark"
                type="text"
                value={poste}
                onChange={(e) => setPoste(e.target.value)}
                placeholder="Ex. Développeur junior"
                required
              />
            </div>

            {/* Champ Statut */}
            <div className="mb-4">
              <label
                htmlFor="status"
                className="form-label fw-semibold"
                style={{ color: 'tomato' }}
              >
                Statut
              </label>

              <input
                id="status"
                className="form-control bg-white text-dark"
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Ex. En attente"
                required
              />
            </div>

            {/* Boutons */}
            <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">

              <button
                className="btn btn-primary px-4"
                type="submit"
              >
                + Ajouter
              </button>

              <button
                className="btn btn-outline-light px-4"
                type="button"
                onClick={fermerFormulaire}
              >
                ← Retour au tableau
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormulaireCandidature