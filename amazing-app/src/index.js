import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';


function AmazingApp() {
  
  const [pets, setPets] = useState([])  
// run only once the first time it loads
  useEffect(() => {
    setPets(JSON.parse(localStorage.getItem("myPetsData")))
  }, [])
// run everytime the pets state changes
  useEffect( () => {
    localStorage.setItem("myPetsData", JSON.stringify(pets))
  }, [pets])
  
  return <>
    <OurHeader/>
    <TimeArea />
    <LikeArea/> 
    <OurForm setPets = {setPets}/> 
    <ul>
      {
      pets.map(pet => <Pet setPets = {setPets} id={pet.id} name={pet.name} species= {pet.species} age = {pet.age}  key={pet.id}/>)
      }
    </ul>
    <Footer/>
      </>
}

function OurHeader() {
  return <h1>Our Amazing App!</h1>
}

function TimeArea() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  
  setTimeout(function(){
    setCurrentTime(new Date().toLocaleTimeString())
  }, 1000)

  return <p>The current time is {currentTime}.</p>
}

function LikeArea() {
  const [likeCount, setLikeCount] = useState(0)

  function increaseLikesHandler(){
    setLikeCount(prev => prev + 1)
  }

  function decreaseLikesHandler(){
    if (likeCount>0){
      setLikeCount(prev => prev -1)
    }
  }

  return <>
    <button onClick = {increaseLikesHandler} id="increase-likes">Increase Likes</button>
    <button onClick = {decreaseLikesHandler} id="decrease-likes">Decrease Likes</button>
    <p>The number of likes is now {Math.max(likeCount, 0)}.</p>
    </>
}

function OurForm(props) {
  
  const [name, setName] = useState()
  const [species, setSpecies] = useState()
  const [age, setAge] = useState()

  function handleSubmit(e) {
    e.preventDefault()
    if (name!=="" & species!=="" & age!==""){
    props.setPets(prev => prev.concat({name, species, age, id: Date.now()}))
      } 
    setName("")
    setSpecies("")
    setAge("")
  }

  return (
    <form id = "ourform" onSubmit = {handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
      <input value = {name} onChange = {e => setName(e.target.value)} id="name" placeholder="Name of pet"></input>
      <input value = {species}  onChange = {e => setSpecies(e.target.value)} id="species" placeholder="Species"></input>
      <input value = {age} onChange = {e => setAge(e.target.value)} id="age" placeholder="Age in years"></input>
      <button id= "add-pet">Add Pet</button>
      </fieldset>
      
    </form>
)}

function Pet(props) {
  function handleDelete(e){
    props.setPets(prev => prev.filter(pet => pet.id != props.id))
  }

  return <li>{props.name} is a {props.age} year old {props.species}
    <button id = "delete-btn" onClick={handleDelete}>Delete</button>
    </li>
}

function Footer() {
  return <small>@Amazing App Copyright 2020</small>
}

ReactDOM.render(<AmazingApp/>, document.querySelector("#root"))