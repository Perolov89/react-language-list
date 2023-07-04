import { FC } from "react"
import PersonType from "../types/types"
import Person from "../app/Person/Person"




const Gallery: FC = (props) => {

// const test = props
// console.log(test)


    return(
        <>
        <article>
            <h2>Language</h2>
            <ul>
                <li>
                    <Person />
                </li>
            </ul>
        </article>
        
        </>
    )
}


export default Gallery