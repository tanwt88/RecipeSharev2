import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './NavigationBar';

const ReportPage = () => {
const id  = useParams<{ id: string }>();
const [reportedUserEmail, setReportedUserEmail] = useState('');
const [reason, setReason] = useState('');
const navigate = useNavigate();



    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const report = {
            reported_user_email: reportedUserEmail,
            reason,
            report_id: Math.floor(Math.random() * 10000),
            created_at: new Date().toISOString(),
        };
        axios.post('/report', report)
            .then(res => console.log(res.data))
            .catch(error => console.log(error));
        setReportedUserEmail('');
        setReason('');
        type FormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    }

return (
    <><NavigationBar /><Container className="my-5">
        <h1>Report User</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reportedUserEmail">
                <Form.Label>Reported User Email</Form.Label>
                <Form.Control
                    type="email"
                    value={reportedUserEmail}
                    onChange={(e: React.ChangeEvent<FormControlElement>) => setReportedUserEmail(e.target.value)}
                    required />
            </Form.Group>
            <Form.Group controlId="reason">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                    as="select"
                    value={reason}
                    onChange={(e: React.ChangeEvent<FormControlElement>) => setReason(e.target.value)}
                    required
                >
                    <option value="">Select Reason</option>
                    <option value="spam">Spam</option>
                    <option value="hate speech">Hate Speech</option>
                    <option value="inappropriate content">Inappropriate Content</option>
                    <option value="other">Other</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        <Button type="button" onClick={() => navigate(-1)}> Cancel </Button>
    </Container></>
);
};

export default ReportPage;