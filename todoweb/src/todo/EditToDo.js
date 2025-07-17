// src/components/EditTodo.js
import { useState } from 'react';
import useApi from '../api/useApi';
import { Form, Button, Card } from 'react-bootstrap';

export default function EditTodo({ todo, onDone }) {
  const api = useApi();
  const [form, setForm] = useState({ title: todo.title, description: todo.description });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm('Are you sure you want to update this todo?');
    if (!confirmUpdate) return;
    try {
      await api.put(`/id/${todo.id}`, form);   // ✅ Pass ObjectId in URL
      onDone(); // Refresh or exit edit mode
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update the todo');
    }
  };

  return (
    <Card className="p-3 mb-4">
      <h4>Edit Todo</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            
          />
        </Form.Group>
        <Button type="submit" variant="primary">Update Todo</Button>{' '}
        <Button variant="secondary" onClick={onDone}>Cancel</Button>
      </Form>
    </Card>
  );
}
