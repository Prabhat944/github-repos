import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import RepoList from '../RepoList';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('RepoList Component', () => {
  test('should display loading message initially', () => {
    render(
      <Router>
        <RepoList />
      </Router>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('should render a list of repositories after fetching data', async () => {
    axios.get.mockResolvedValue({
      data: [
        { id: 4967118, name: 'godaddy/gdapi-php' },
        { id: 5540434, name: 'lazy-social-buttons' },
      ],
    });

    render(
      <Router>
        <RepoList />
      </Router>
    );

    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    expect(screen.getByText(/gdapi-php/i)).toBeInTheDocument();
    expect(screen.getByText(/lazy-social-buttons/i)).toBeInTheDocument();
  });

  test('should handle error state gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Error fetching repos'));

    render(
      <Router>
        <RepoList />
      </Router>
    );

    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    expect(screen.queryByText(/gdapi-php/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/lazy-social-buttons/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Error fetching repos/i)).toBeInTheDocument();
  });
});
