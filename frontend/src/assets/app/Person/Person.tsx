import { FC } from "react"
type PersonProps = {
    id: string
    name: string
    handleDelete: (id: string) => void
} 


const Person: FC<PersonProps> = ({ id, name, handleDelete }) => {

    // async axios delete request

    const onclick = () => {
        //delete request
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