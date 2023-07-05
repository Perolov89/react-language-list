import { useState, FormEvent,ChangeEvent } from "react";
import axios from "axios";
import Select from "react-select";
import { v4 as uuidv4 } from 'uuid';
import PersonType from "../types/types";



const options = [
    { value: "german", label: "German" },
    { value: "swedish", label: "Swedish" },
    { value: "russian", label: "Russian" },
  ];

const Form = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputName, setInputName] = useState('')
    
  const addPerson: PersonType = {
    id: uuidv4(),
    name: inputName,
    language: selectedOption?.value
  };

  async function postPerson() {
    axios.post("http://localhost:3000/people", addPerson);
    console.log("post request sent"); // error handling needed
  } // post request sends when person is deleted

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postPerson(); // rerender with statevariable
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputName(event.target.value)
  } 


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name"  onChange={handleNameChange} />
        </label>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          placeholder="Pick language"
        />
        <button type="submit">Add person</button>
      </form>
    </>
  );
}


export default Form