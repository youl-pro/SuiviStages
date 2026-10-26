
import { useEffect, useState } from 'react';
import './App.css';
import AjouterCandidature from './composants/AjouterCandidature';

function App() {
  const [candidatures, setCandidatures] = useState([]);
  const [AfficherformulaireDAjout, SetAfficherformulaireDAjout] =
    useState(false);

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

  return (
    <div className="container text-center">

      {AfficherformulaireDAjout ? (
        // Afficher le formulaire
        <AjouterCandidature
          setCandidatures={setCandidatures}
          fermerFormulaire={() => SetAfficherformulaireDAjout(false)}
        />
      ) : (
        // Afficher le tableau
        <>
          <div className="titre-actions">
            <h1>Suivi de candidatures</h1>

            <button
              className="btn-ajouter"
              onClick={() => SetAfficherformulaireDAjout(true)}
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
                </tr>
              </thead>

              <tbody>
                {candidatures.map((c) => (
                  <tr key={c.id}>
                    <td className="text-white">{c.entreprise}</td>
                    <td className="text-white">{c.poste}</td>
                    <td className="text-white">{c.status}</td>
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
