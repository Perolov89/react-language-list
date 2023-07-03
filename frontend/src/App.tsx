import { useState, useEffect, FormEvent, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const options = [
  { value: "german", label: "German" },
  { value: "swedish", label: "Swedish" },
  { value: "russian", label: "Russian" },
];

function App() {
  const [people, setPeople] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const inputName = useRef(null)


  useEffect(() => {
    async function getPeople() {
      const response = await axios.get("http://localhost:3000/people");
      setPeople(response.data);
      console.log("get request sent");
    } // error handling needed
    getPeople();
  }, []);

  async function postPerson() {
    axios.post("http://localhost:3000/people", addPerson);
    console.log("post request sent");
  }

  console.log("rendered");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(inputName.current.value)
  };

  return (
    <>
      <h1>Von Liebenstein</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
        <input type="text" placeholder="" name="name" ref={inputName}/>
        </label>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption} // triggers rerender
          options={options}
          placeholder="Pick language"
        />
        <button type="submit">Add person</button>
      </form>
    </>
  );
}

export default App;
