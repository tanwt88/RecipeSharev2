import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';

const ReportModerator = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('/home/:id/reports')
      .then(res => setReports(res.data))
      .catch(error => console.log(error));
  }, []);


  const handleDelete = (id: string) => {
   
  };

  return (
    <>
      <AdminNavBar />
      <Container className="my-5">
        <h1>Report Moderator</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Reported User</th>
              <th>Reporter</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report: any, index: number) => (
              <tr key={report.report_id}>
                <td>{index + 1}</td>
                <td>{report.reported_user_email}</td>
                <td>{report.reporter_user_email}</td>
                <td>{report.reason}</td>
                <td>{new Date(report.created_at).toLocaleDateString()}</td>
                <td>
                  <Button className="mx-2" variant="warning" onClick={() => handleDelete(report.reported_user_id)}>
                    Delete User
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ReportModerator;
