import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../Form/Form";
import "./App.css";
import PersonType from "../types/types";
import Gallery from "../Gallery/Gallery";
import Select from "react-select";

function App() {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { value: "all", label: "All" },
    { value: "german", label: "German" },
    { value: "french", label: "French" },
    { value: "russian", label: "Russian" },
  ];

  useEffect(() => {
    async function getPeople() {
      const response = await axios.get("http://localhost:3000/people");
      setPeople(response.data);
    } // error handling needed
    getPeople();
  }, []);

  const handleDelete = (id: string) => {
    setPeople(
      people.filter((person) => {
        return person.id !== id;
      })
    );
  };

  const handleAddPerson = (addPerson: PersonType) => {
    setPeople([...people, addPerson]);
  };

  const german = people.filter((p) => p.language === "german");
  const french = people.filter((p) => p.language === "french");
  const russian = people.filter((p) => p.language === "russian");



  return (
    <>
      <h1>Who speaks what?</h1>
      <Form handleAddPerson={handleAddPerson} />
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        className="showSpeakers"
      />
      <main> 
        { ((selectedOption.value === "all") || (selectedOption.value === "german")) &&
        <article className="german">
          <h2 className="german__h2">Native German</h2>
            <Gallery people={german} handleDelete={handleDelete}  />
        </article>}
        { ((selectedOption.value === "all") || (selectedOption.value === "french")) &&
        <article className="french">
          <h2>Native French</h2>   
            <Gallery people={french} handleDelete={handleDelete} /> 
        </article>}
        { ((selectedOption.value === "all") || (selectedOption.value === "russian")) &&
        <article className="russian">
          <h2>Native Russian</h2>
            <Gallery people={russian} handleDelete={handleDelete} />
        </article>}
      </main>
    </>
  );
}

export default App;
