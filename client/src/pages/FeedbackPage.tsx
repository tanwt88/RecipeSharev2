import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import Feedback from 'react-bootstrap/esm/Feedback';

const FeedbackPage = () => {
  const { id } = useParams<{ id: string }>();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const feedback = {
      subject,
      description,
      user_id: id,
      created_at: new Date().toISOString(),
    };
    axios.post('/home/:id/feedback', Feedback)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
    setSubject('');
    setDescription('');
  };

  return (
    <>
      <NavigationBar/>
      <Container className="my-5">
        <h1>Feedback</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSubject(e.target.value)
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Button onClick={()=> navigate(-1)}>Cancel</Button>
      </Container>
    </>
  );
};

export default FeedbackPage;
