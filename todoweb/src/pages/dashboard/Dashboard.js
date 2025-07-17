import { useState } from 'react';
import CreateTodo from '../../todo/CreateToDo';
import TodoList from '../../todo/ToDoList';
import EditTodo from '../../todo/EditToDo';
import TodoById from '../../todo/ToDoById';
import { Container } from 'react-bootstrap';

export default function Dashboard() {
  const [editingTodo, setEditingTodo] = useState(null);
  const [refresh, setRefresh] = useState(0);

  return (
    <Container className="mt-4">
      <h2>Todo Dashboard</h2>
      <CreateTodo onSuccess={() => setRefresh(prev => prev + 1)} />
      {editingTodo && (
  <EditTodo
    todo={editingTodo}
    onDone={() => {
      setEditingTodo(null);        // close the edit form
      setRefresh(prev => prev + 1); // reload the todo list
    }}
  />
)}

      <TodoList key={refresh} onEdit={setEditingTodo} />
    </Container>
  );
}
