import React, { useState, useEffect } from 'react';
import httpClient from "../httpClient";
import { User } from "../types";

const LandingPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const logoutUser = async () => {
    // eslint-disable-next-line no-unused-vars
    const resp = await httpClient.post('//localhost:5000/logout');
    window.location.href = '/';
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get('//localhost:5000/');
        setUser(resp.data);
      } catch (error) {
        console.log('error');
      }
    })();
  }, []);

  return (
    <body className="background">
    <div className= "container" >
      <h1>Welcome to Recipe Share</h1>
      {user != null ? (
        <div>
          <h1>Logged in</h1>
          <h3>ID: {user.id}</h3>
          <h3>Email : {user.email}</h3>
          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <div>
          <a href="login">
            <button>Login</button>
          </a>
          <a href="/register">
            <button>Register</button>
          </a>
        </div>
      )}
    </div>
    </body>
  );
};

export default LandingPage;
