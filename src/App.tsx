import { useState } from "react";
import {DragDropContext, DropResult} from "react-beautiful-dnd"
import InputField from "./components/InputField";
import { Todo } from "./helper";
import { v4 as uuid } from "uuid";
import TodoList from "./components/TodoList";


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const id = uuid().slice(0, 5);

  function handleAdd(e: React.FormEvent): void {
    e.preventDefault();
    if (todo) {
      setTodos((prev) => {
        return [...prev, { id, todo, isDone: false }];
      });
    }
    setTodo("");
  }


  const onDragEnd = (result: DropResult) => {
    const {source, destination } = result;
    console.log(result)
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add;
    const active= todos;
    const complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1)
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete)
    setTodos(active)
  }
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify App</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
