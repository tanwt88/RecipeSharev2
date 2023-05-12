import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';

interface Feedback {
  id: number;
  subject: string;
  description: string;
  user_id: string;
  created_at: string;
}

const FeedbackModerator = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    axios.get('/feedback')
      .then(res => {
        setFeedbacks(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`/feedback/${id}`)
      .then(res => {
        setFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback.id !== id));
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <AdminNavBar />
      <Container className="my-5">
        <h1>Feedback Moderator</h1>
        {feedbacks.map(feedback => (
          <div key={feedback.id} className="my-4 border p-3">
            <h4>{feedback.subject}</h4>
            <p>{feedback.description}</p>
            <p>Created by: {feedback.user_id}</p>
            <p>Created at: {feedback.created_at}</p>
            <Button variant="danger" onClick={() => handleDelete(feedback.id)}>Delete</Button>
          </div>
        ))}
      </Container>
    </>
  );
};

export default FeedbackModerator;
