import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../Form/Form";
import "./App.css";
import PersonType from "../types/types";
import Gallery from "../Gallery/Gallery";
import Select from "react-select";

type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  { value: "all", label: "All" },
  { value: "german", label: "German" },
  { value: "french", label: "French" },
  { value: "russian", label: "Russian" },
];

function App() {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options[0]
  );

  useEffect(() => {
    async function getPeople() {
      try {
        const response = await axios.get("http://localhost:3000/people");
        setPeople(response.data);
      } catch (error) {
        console.error("An error occurred while fetching people:", error);
      }
    }
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
      <main className="main">
        <section className="section-add-person">
          <h1>Add a native speaker</h1>
          <Form handleAddPerson={handleAddPerson} />
        </section>
        <section className="section-showspeakers">
          <h2 className="showspeakers_h2">Show Speakers</h2>
          <Select
            defaultValue={null}
            value={selectedOption}
            placeholder="Select..."
            onChange={(option) => setSelectedOption(option)}
            options={options}
            className="showspeakers"
          />
        </section>
        <section className="language-boxes">
          {(selectedOption.value === "all" ||
            selectedOption.value === "german") && (
            <article className="german">
              <h2 className="german__h2">Native German</h2>
              <Gallery people={german} handleDelete={handleDelete} />
            </article>
          )}
          {(selectedOption.value === "all" ||
            selectedOption.value === "french") && (
            <article className="french">
              <h2>Native French</h2>
              <Gallery people={french} handleDelete={handleDelete} />
            </article>
          )}
          {(selectedOption.value === "all" ||
            selectedOption.value === "russian") && (
            <article className="russian">
              <h2>Native Russian</h2>
              <Gallery people={russian} handleDelete={handleDelete} />
            </article>
          )}
        </section>
      </main>
    </>
  );
}

export default App;

// fix typescript errors. selectionbars does not present current selection.
//  use pretty code in the end when all is done
