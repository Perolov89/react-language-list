import { FC, useState } from "react";
import PersonType from "../types/types";
import Person from "../app/Person/Person";
import axios from "axios";

type GalleryProps = {
  people: PersonType[];
  handleDelete: (id: string) => void
};

const Gallery: FC<GalleryProps> = ({ people, handleDelete }) => {



  const names = people.map((p: PersonType) => (
    <li key={p.id}>
      <Person id={p.id} name={p.name} handleDelete={handleDelete} />
    </li>
  ));

  return (
    <>
      <article>
        <ul>{names}</ul>
      </article>
    </>
  );
};

export default Gallery;
