import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.github.com/orgs/godaddy/repos')
      .then(response => {
        setRepos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching repos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>GoDaddy GitHub Repositories</h1>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <Link to={`/repo/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
