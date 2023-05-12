import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import httpClient from "../httpClient";
import useParams from 'react-router-dom';
import { User } from "../types";

function Homepage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await httpClient.get(`//localhost:5000/home/`);
        setUser(resp.data);

      } catch (error) {
        console.log('error');
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <NavigationBar />
      <Container fluid className="mt-3">
        <SearchBar onSearch={function (searchTerm: string, sortOption: string): void {
          
        }} />Search
        <Gallery searchTerm={''} sortOption={''} />
      </Container>
      <p>Home</p>
    </div>
  );
}

export default Homepage;
