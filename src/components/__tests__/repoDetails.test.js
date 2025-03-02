import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import RepoDetails from '../RepoDetails';

jest.mock('axios');

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => { });
  jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
  console.warn.mockRestore();
  console.error.mockRestore();
});

describe('RepoDetails Component', () => {
  it('displays loading text initially', () => {
    axios.get.mockResolvedValueOnce({ data: {} });

    render(
      <Router>
        <RepoDetails />
      </Router>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('displays repo details after API call', async () => {
    const mockRepo = {
      name: 'gdapi-php',
      description: 'A PHP client for Go Daddy® REST APIs.',
      language: 'PHP',
      forks_count: 15,
      open_issues_count: 2,
      watchers_count: 31,
      html_url: 'https://github.com/godaddy/gdapi-php',
    };

    axios.get.mockResolvedValueOnce({ data: mockRepo });

    render(
      <Router>
        <RepoDetails />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/gdapi-php/i)).toBeInTheDocument());

    expect(screen.getByText(/A PHP client for Go Daddy® REST APIs./i)).toBeInTheDocument();
    expect(screen.getByText(/Language\(s\): PHP/i)).toBeInTheDocument();
    expect(screen.getByText(/Forks: 15/i)).toBeInTheDocument();
    expect(screen.getByText(/Open Issues: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Watchers: 31/i)).toBeInTheDocument();
  });

  it('displays error if repo not found', async () => {
    axios.get.mockRejectedValueOnce(new Error('Repo not found'));

    render(
      <Router>
        <RepoDetails />
      </Router>
    );

    await waitFor(() => expect(screen.getByText(/Repo not found/i)).toBeInTheDocument());
  });
});