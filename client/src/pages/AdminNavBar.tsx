import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/admin/<id:string>">Home</Link>
        </li>
        <li>
          <Link to="/reportAdmin">Report</Link>
        </li>
        <li>
        <Link to="/feedbackAdmin">Feedback</Link>
        </li>
        <li>
        <Link to="/Admin">Logout</Link>
        </li>
        

      </ul>
    </div>
  );
};

export default AdminNavBar;