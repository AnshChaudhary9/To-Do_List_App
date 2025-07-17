import { useState } from 'react';
import useApi from '../api/useApi';
import { Form, Button, Card } from 'react-bootstrap';

export default function TodoById() {
  const api = useApi();
  const [id, setId] = useState('');
  const [todo, setTodo] = useState(null);

  const handleSearch = async () => {
    const res = await api.get(`/id/${id}`);
    setTodo(res.data);
  };

  return (
    <Card className="p-3">
      <h4>Get Todo by ID</h4>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>ID</Form.Label>
          <Form.Control value={id} onChange={e => setId(e.target.value)} placeholder="Enter Todo ID" />
        </Form.Group>
        <Button onClick={handleSearch}>Find</Button>
      </Form>
      {todo && (
        <Card className="mt-3 p-2">
          <h5>{todo.title}</h5>
          <p>{todo.description}</p>
        </Card>
      )}
    </Card>
  );
}
