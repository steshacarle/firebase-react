// import './App.css'
import { useState, useEffect } from 'react';
import { Auth } from "./components/auth";
import { auth, db } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'


function App() {
  const [athleteList, setAthleteList] = useState([]);

  // New athlete state
  const [newAthleteName, setNewAthleteName] = useState("")
  const [NewAthleteSport, setNewAthleteSport] = useState("")
  const [newAthleteAbout, setNewAthleteAbout] = useState("")
  const [newAthleteEmailUpdate, setNewAthleteEmailUpdate] = useState(false)

  // update athlete about
  const [updatedAbout, setUpdatedAbout] = useState("")


  const athletesCollectionRef = collection(db, "athletes")

  const getAthletesList = async() => {
    // read the data
    try {
      const data = await getDocs(athletesCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      console.log(filteredData)
      setAthleteList(filteredData)
    } catch (err) {
      console.error(err)
    }
    // set the movie list
  }


  const deleteAthlete = async (id) => {
    const athleteDoc = doc(db, "athletes", id)
    await deleteDoc(athleteDoc)
    getAthletesList()
  }

  const updateAthleteAbout = async (id) => {
    const athleteDoc = doc(db, "athletes", id)
    await updateDoc(athleteDoc, {about: updatedAbout})
    getAthletesList()
  }

  useEffect(() => {
    getAthletesList();
  }, [])


  const onSubmitAthlete = async () => {
    try {
      await addDoc(athletesCollectionRef, {
        name: newAthleteName,
        sport: NewAthleteSport,
        about: newAthleteAbout,
        emailUpdate: newAthleteEmailUpdate,
        userID: auth?.currentUser?.uid,
      })
      getAthletesList()
    } catch (err) {
      console.error(err)
    }
  }

  return (
      <div className="App">
        <Auth />
        <div>
          <h1>Hey {auth?.currentUser?.displayName || "You" }! </h1>
        </div>
        <div>
          <h2>Add athlete</h2>
          <input placeholder="Athlete Name" onChange={(e) => setNewAthleteName(e.target.value)}/>
          <input placeholder="Sport" onChange={(e) => setNewAthleteSport(e.target.value)}/>
          <input placeholder="About" onChange={(e) => setNewAthleteAbout(e.target.value)}/>
          <input type="checkbox" checked={newAthleteEmailUpdate} onChange={(e) => setNewAthleteEmailUpdate(e.target.checked)}/>
          <label>Email Updates</label>
          <button onClick={onSubmitAthlete}>Submit Athlete</button>
        </div>

        <div>
          {athleteList.map((athlete)=> (
            <div key={athlete.id}>
              <h1 style={{ color: athlete.emailUpdate ? "green" : "blue" }}>{athlete.name}</h1>
              <p> Sport: {athlete.sport} </p>
              <p>{athlete.about}</p>
              <button onClick={() => deleteAthlete(athlete.id)}> Delete Athlete </button>

              <input placeholder='New about' onChange={(e) => setUpdatedAbout(e.target.value)}/>
              <button onClick={() => updateAthleteAbout(athlete.id)} >Update About</button>
            </div>
          ))}
        </div>
      </div>
  )
}

export default App
