import { useState, useEffect} from "react";
import axios from "axios";
import Form from "../Form/Form";
import "./App.css";
import PersonType from "../types/types";
import Gallery from "../Gallery/Gallery";



function App() {
  const [people, setPeople] = useState<PersonType[]>([]);



  useEffect(() => {
    async function getPeople() {
      const response = await axios.get("http://localhost:3000/people");
      setPeople(response.data);
      console.log("get request sent");
    } // error handling needed
    getPeople();
  }, []);

    const german = people.filter(p => p.language === 'german')
    const swedish = people.filter(p => p.language === 'swedish')
    const russian = people.filter(p => p.language === 'russian')


  return (
    <>
      <h1>Who speaks what?</h1>
    <Form />
    <h2>Native German</h2>
    <Gallery people={german} />
    <h2>Native Swedish</h2>
    <Gallery people={swedish}/>
    <h2>Native Russian</h2>
    <Gallery people={russian}/>
    </>
  );
}

export default App;
