import { Box} from "@mui/material";

//import { useState } from "react";

import { Todo } from "../../types";

import { useParams } from 'react-router-dom'


interface Props {
  todos: Todo[];
  //setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const PatientPage = ({ todos }: Props) => {

  const id = useParams().id as string
  const todo = todos.find(n => n.id == id)
  //const [showAdd, setShowAdd] = useState<boolean>(false)

  console.log(todo)

  /*
  const findDiagnose = (code: string): Diagnosis | undefined => {
    return diagnoses.find(n => n.code === code)
  }
  */
  return (
    <div className="App">
      <Box>
        <h2> {todo?.title}</h2>

        <br />
        <p>{ todo?.content}</p>

        <br />
        <p>create date: {todo?.createDate}</p>

        {todo?.updateDate &&  <p>update date: {todo?.updateDate}</p>}
       
      </Box>


    </div>
  );
};

export default PatientPage;
