import { useState } from 'react';
import useApi from '../api/useApi';
import { Form, Button, Card, Alert, Spinner  } from 'react-bootstrap';
import { useAuth } from '../context/authcontext/AuthContext';

export default function CreateTodo({ onSuccess }) {
  const api = useApi();
  const [todo, setTodo] = useState({ title: '', description: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
    if (!token) return <p>Please log in to view your dashboard.</p>;

  if (!api.defaults.headers.Authorization) {
    return <p>Loading Create Todo...</p>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmCreate = window.confirm('Are you sure you want to create this todo?');
    if (!confirmCreate) return;
    setLoading(true);
    setError(null);
    try {
      await api.post('', todo);
      setTodo({ title: '', description: '' });
      onSuccess();
    } catch (err) {
      setError('Failed to create todo. Please try again.');
      console.error('Create todo error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="p-4 shadow-sm mb-4 border-0" style={{ background: '#fdfdfd' }}>
      <h4 className="mb-3 text-primary">📝 Create a New Todo</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="todoTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="todoDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="w-100"
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Creating...
            </>
          ) : (
            'Create Todo'
          )}
        </Button>
      </Form>
    </Card>
  );
}
