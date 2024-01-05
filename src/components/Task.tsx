import { useEffect, useRef, useState } from "react";
import { Todo } from "../helper";
import { Draggable } from "react-beautiful-dnd";
import { HiCheck } from "react-icons/hi2";
import { HiPencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const Task = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  function handleDone(id: string) {
    if (!edit) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
      setTodos(updatedTodos);
    }
  }

  function handleDelete(id: string) {
    if (!edit) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  }

  function handleEdit() {
    if (!edit && !todo.isDone) {
      setEdit(true);
    }
  }

  function handleSubmit(e: React.FormEvent, id: string): void {
    e.preventDefault();
    if (edit) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo
      );
      setTodos(updatedTodos);
      setEdit(false);
    }
  }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleSubmit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="todos__single--text"
              onChange={(e) => setEditTodo(e.target.value)}
              value={editTodo}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <p className="todos__single--text">{todo.todo}</p>
          )}
          <div className="icon">
            <span className="icon" onClick={handleEdit}>
              <HiPencilSquare />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <HiCheck />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <HiOutlineTrash />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default Task;
