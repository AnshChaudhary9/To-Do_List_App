// TodoList.js
import { useEffect, useState } from 'react';
import useApi from '../api/useApi';
import { Card, Button } from 'react-bootstrap';

export default function TodoList({ onEdit }) {
  const api = useApi();
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await api.get('');
    setTodos(res.data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (!confirmDelete) return;
    await api.delete(`/id/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Card className="p-3 mb-4">
      <h4>Your Todos</h4>
      {todos.map(todo => (
        <Card key={todo.id} className="mb-2 p-2">
          <strong>{todo.title}</strong>
          <p>{todo.description}</p>
          <Button size="sm" onClick={() => onEdit(todo)}>Edit</Button>{' '}
          <Button size="sm" variant="danger" onClick={() => handleDelete(todo.id)}>Delete</Button>
        </Card>
      ))}
    </Card>
  );
}
