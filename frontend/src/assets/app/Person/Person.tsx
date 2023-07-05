import { FC } from "react"
import axios from "axios";
type PersonProps = {
    id: string
    name: string
    handleDelete: (id: string) => void
} 


const Person: FC<PersonProps> = ({ id, name, handleDelete }) => {

    async function deletePerson(id:string) {
        axios.delete(`http://localhost:3000/people/${id}`);
        console.log("post request sent"); // error handling needed
      }

    const onclick = () => {
        deletePerson(id);
        handleDelete(id);
    }

    return (
        <>
        {name}
        <button onClick={onclick}>Delete</button>
        </>
    )
}


export default Person