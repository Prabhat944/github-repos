import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RepoDetails = () => {
  const { repoName } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.github.com/repos/godaddy/${repoName}`)
      .then(response => {
        setRepoDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching repo details:', error);
        setLoading(false);
      });
  }, [repoName]);

  if (loading) return <div>Loading...</div>;

  if (!repoDetails) return <div>Repo not found</div>;

  return (
    <div className="repo-details">
      <h1>{repoDetails.name}</h1>
      <p><strong>Description:</strong> {repoDetails.description}</p>
      <p><strong>Language(s):</strong> {repoDetails.language || 'N/A'}</p>
      <p><strong>Forks:</strong> {repoDetails.forks_count || 0}</p>
      <p><strong>Open Issues:</strong> {repoDetails.open_issues_count || 0}</p>
      <p><strong>Watchers:</strong> {repoDetails.watchers_count || 0}</p>
      <p><a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer">Visit Repo</a></p>
    </div>
  );
};

export default RepoDetails;
