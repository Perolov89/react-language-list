import { FC } from "react";
import PersonType from "../types/types";
import Person from "../app/Person/Person";

type GalleryProps = {
    people: PersonType[];
  }

const Gallery: FC<GalleryProps> = ({ people }) => {

   const handleDelete = () => {
    
   }


  const names = people.map((p: PersonType) =>
    <li key={p.id}> 
    <Person id={p.id} name={p.name} handleDelete={handleDelete} /> 
    </li>);

  return (
    <>
      <article>
        <ul>
        {names}
        </ul>
      </article>
    </>
  );
};

export default Gallery;
