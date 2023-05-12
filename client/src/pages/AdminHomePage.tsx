import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AdminNavBar from './AdminNavBar';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import { User } from "../types";
import httpClient from '../httpClient';

function AdminHomepage() {
  const [admin, setAdmin] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await httpClient.get('//localhost:5000/admin/<id:string>');
        setAdmin(resp.data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <AdminNavBar />
      <Container fluid className="mt-3">
        <SearchBar onSearch={(searchTerm: string, sortOption: string): void => {}} />
        <Gallery searchTerm={''} sortOption={''} />
      </Container>
      <p>Home</p>
    </div>
  );
}

export default AdminHomepage;
