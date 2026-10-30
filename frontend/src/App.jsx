
import { useEffect, useState } from 'react';
import './App.css';
import FormulaireCandidature from './composants/FormulaireCandidature';

function App() {
  const [candidatures, setCandidatures] = useState([]);
  const [Afficherformulaire, setAfficherformulaire] = useState(false);

const [candidatureAmodifiee, setCandidatureAmodifiee] = useState(null);

  // chargement du tableau candidatures
    useEffect(() => {
    async function chargerCandidature() {
      const reponse = await fetch(
        'https://localhost:7092/api/candidatures'
      );

      const donnees = await reponse.json();
      setCandidatures(donnees);
    }

    chargerCandidature();
  }, []);




  //supprimer un candidature
async function supprimerCandidature(candidatureASup)
  {
    try{const reponse = await fetch(`https://localhost:7092/api/candidatures/${candidatureASup.id}`, {

     method : 'DELETE'
       })
        if(!reponse.ok){ throw new Error ("Erreur lors de suppression"); }
        setCandidatures(prev => prev.filter(p => p.id != candidatureASup.id ));}
catch(erreur)
    { console.error("Erreur lors de la suppression: ", erreur);}
}

  return (
    <div className="container text-center">

      {Afficherformulaire ? (
        // Afficher le formulaire
        <FormulaireCandidature
          setCandidatures={setCandidatures}
          candidatureAmodifiee = {candidatureAmodifiee}
          fermerFormulaire={() => setAfficherformulaire(false)}
        />
      ) : (
        // Afficher le tableau
        <>
          <div className="titre-actions">
            <h1>Suivi de candidatures</h1>

            <button
              className="btn-ajouter"
              onClick={()=>{
                setCandidatureAmodifiee(null);
                setAfficherformulaire(true);

              }
            }
                
            >
              + Ajouter
            </button>
          </div>

          {candidatures.length > 0 && (
            <table className="table table-dark table-bordered table-hover mt-4">
              <thead>
                <tr>
                  <th style={{ color: 'tomato' }}>Entreprise</th>
                  <th style={{ color: 'tomato' }}>Poste</th>
                  <th style={{ color: 'tomato' }}>Statut</th>
                   <th style={{ color: 'tomato' }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {candidatures.map((c) => (
                  <tr key={c.id}>
                    <td className="text-white">{c.entreprise} </td>
                    <td className="text-white">{c.poste}</td> 
                    <td className="text-white">{c.status}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={()=>supprimerCandidature(c)}> Supprimer </button>
                      <button className="btn btn-primary btn-sm" onClick={ () => {
                        setCandidatureAmodifiee(c);
                        setAfficherformulaire(true);
                        
                      } }> Modifier </button>
                    </td>    
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

    </div>
  );
}

export default App;
