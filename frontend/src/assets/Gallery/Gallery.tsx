import { FC } from "react";
import PersonType from "../types/types";
import Person from "../app/Person/Person";
import "./Gallery.css"

type GalleryProps = {
  people: PersonType[];
  handleDelete: (id: string) => void;
};

const Gallery: FC<GalleryProps> = ({ people, handleDelete }) => {
  const names = people.map((p: PersonType) => (
    <li key={p.id}>
      <Person id={p.id} name={p.name} handleDelete={handleDelete} />
    </li>
  ));

  return (
    <>
      <section className="names">
        <ul>{names}</ul>
      </section>
    </>
  );
};

export default Gallery;
