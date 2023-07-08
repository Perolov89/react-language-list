import { useState, FormEvent, ChangeEvent, FC } from "react";
import axios from "axios";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import PersonType from "../types/types";
import "./Form.css";

type FormProps = {
  handleAddPerson: (addPerson: PersonType) => void;
};

const Form: FC<FormProps> = ({ handleAddPerson }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputName, setInputName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const options = [
    { value: "german", label: "German" },
    { value: "french", label: "French" },
    { value: "russian", label: "Russian" },
  ];

  const addPerson: PersonType = {
    id: uuidv4(),
    name: inputName,
    language: selectedOption?.value,
  };

  async function postPerson() {
    try {
      await axios.post("http://localhost:3000/people", addPerson);
      setErrorMessage("");
      handleAddPerson(addPerson);
    } catch (err: any) {
      setErrorMessage("Something went wrong, please try again");
      if (err.response) {
        // The client was given an error response (5xx, 4xx)
      } else if (err.request) {
        // The client never received a response, and the request was never left
        console.log(err.request);
      } else {
        console.log("Error", err.message);
      }
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postPerson();
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputName(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="Form__input-label">
          Name:
          <input
            type="text"
            name="name"
            onChange={handleNameChange}
            className="Form__input"
          />
        </label>
        <Select
          className="Form__selectionBar"
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          placeholder="Pick language"
        />
        <button type="submit" className="Form__formbutton">
          Add person
        </button>
        <p>{errorMessage}</p>
      </form>
    </>
  );
};

export default Form;
