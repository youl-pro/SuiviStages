import { useEffect, useState } from 'react'
import './App.css'

function App() {

const [candidatures, setCandidatures] = useState([]);

useEffect(()=> {

    async function chargerCandidatures(){
    
    const reponse = await fetch(`https://localhost:7092/api/candidatures`)
    const donnees = await reponse.json();
    setCandidatures(donnees)
}

 // On appelle la fonction tout de suite
    chargerCandidatures()

}, [])
  return (
     <div>
      <h1>Suivi de candidatures</h1>
{candidatures.length > 0 && (
<ul>
  {candidatures.map((c) => (
   <li key={c.id}>{c.entreprise} : {c.poste} ({c.status})</li>
  ))}
</ul>
)}
   
</div>
 
 
   
  )
}

export default App
