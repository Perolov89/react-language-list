import { FC, useState } from "react";
import axios from "axios";
import "./Person.css"
type PersonProps = {
  id: string;
  name: string;
  handleDelete: (id: string) => void;
};

const Person: FC<PersonProps> = ({ id, name, handleDelete }) => {
  const [errorMessage, setErrorMessage] = useState("");

  async function deletePerson(id: string) {
    try {
      axios.delete(`http://localhost:3000/people/${id}`);
      setErrorMessage("");
      handleDelete(id);
    } catch (err: unknown) {
      setErrorMessage("Something went wrong, please try again");
      if (axios.isAxiosError(err)) {
        // Handle Axios error
        if (err.response) {
          // The client was given an error response (5xx, 4xx)
        } else if (err.request) {
          // The client never received a response, and the request was never left
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
      } else {
        // Handle non-Axios errors
        console.log("Unknown error:", err);
      }
    }
  }

  const onclick = () => {
    deletePerson(id);
  };

  return (
    <>
    <div className="Person__P">
      {name}
      <button onClick={onclick} className="deleteButton">Delete</button>
      <p>{errorMessage}</p>
      </div>
    </>
  );
};

export default Person;
