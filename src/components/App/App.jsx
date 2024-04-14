import {useState, useEffect} from 'react';
// import React from 'react';
// const useState = React.useState;
import axios from 'axios';

function App () {
 
  const [creatureList, setCreatureList] = useState([
    {name :'Unicorn', origin: 'Britain'},
    {name : 'Sphinx', origin: 'Egypt'},
    {name: 'Jackalope', origin: 'America'}
  ]);

  // Pieces of State
  const [creatureNameInput, setCreatureNameInput] = useState('')
  const [creatureOriginInput, SetCreatureOriginInput] = useState('')

  // hook into the React lifecycle and run fetchCreatures whe this component loads
  // react equivalent to jQuery's onReady
  useEffect(() => {
    fetchCreatures()
  }, [])
  // ^^ The empty array is saying that this should only run once, when the component loads




  const fetchCreatures = () => {


    // Alternative syntax for axios call:
    // axios.get('/creature')
    // .then().....

    axios({
      method: 'GET',
      url: '/creature'
    }).then( response => {
      // response.data is where the server response data we care about is.
      console.log('response is:', response);

      setCreatureList(response.data)
    }).catch( err => {
      console.log('error w/ fetch creatures', err);
      alert('error w/ fetch creatures')
    })
  }
  

  const handleSubmit = () => {
    console.log('submitted');

    axios.post('/creature', {
      name: creatureNameInput,
      origin: creatureOriginInput
    }).then(response => {
      console.log('new creature posted');
      fetchCreatures();
      setCreatureNameInput('')
      SetCreatureOriginInput('')
    }).catch( err => {
      console.log('error posting to server', err);
      alert('error posting to server');
    });
  } // end handleSubmit




  return (
    <div>
      <form>
        <input type="text" placeholder="Creature name" onChange={event => setCreatureNameInput(event.target.value)} value={creatureNameInput}/>
        <input type="text" placeholder="Creature origin" onChange={event => SetCreatureOriginInput(event.target.value)} value={creatureOriginInput}/>
        <button type='button' id='submit-btn' onClick={handleSubmit}>Add new creature</button>
      </form>
      <ul>
        {creatureList.map(creature => (
          <li key={creature.name}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App
