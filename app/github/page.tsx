'use client';

import React, { useEffect, useState } from 'react';
import Layout from '../layout';

interface GitHubRepo {
  id: number;
  name: string;
}

interface GitHubCommit {
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

interface GitHubContributor {
  id: number;
  login: string;
  contributions: number;
}

const SettingsPage = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [contributors, setContributors] = useState<GitHubContributor[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const reposResponse = await fetch('/api/github?type=repos');
        if (!reposResponse.ok) {
          throw new Error(`Error fetching repos: ${reposResponse.status}`);
        }
        const reposData = await reposResponse.json();
        setRepos(reposData);
        if (reposData.length > 0) {
          setSelectedRepo(reposData[0].name);
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    if (selectedRepo) {
      const fetchCommits = async () => {
        try {
          const commitsResponse = await fetch(
            `/api/github?type=commits&repo=${selectedRepo}`
          );
          if (!commitsResponse.ok) {
            throw new Error(`Error fetching commits: ${commitsResponse.status}`);
          }
          const commitsData = await commitsResponse.json();
          setCommits(commitsData.slice(0, 5));
        } catch (error) {
          console.error('Error fetching commits:', error);
        }
      };

      const fetchContributors = async () => {
        try {
          const contributorsResponse = await fetch(
            `/api/github?type=contributors&repo=${selectedRepo}`
          );
          if (!contributorsResponse.ok) {
            throw new Error(
              `Error fetching contributors: ${contributorsResponse.status}`
            );
          }
          const contributorsData = await contributorsResponse.json();
          setContributors(contributorsData);
        } catch (error) {
          console.error('Error fetching contributors:', error);
        }
      };

      fetchCommits();
      fetchContributors();
    }
  }, [selectedRepo]);

  return (
    <Layout>
      <div>
        <h1>GitHub Dashboard</h1>

        <section>
          <h2>Select a Repository</h2>
          {repos.length > 0 ? (
            <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
            >
              {repos.map((repo) => (
                <option key={repo.id} value={repo.name}>
                  {repo.name}
                </option>
              ))}
            </select>
          ) : (
            <p>No repositories available</p>
          )}
        </section>

        <section>
          <h2>Last 5 Commits for {selectedRepo}</h2>
          {commits.length > 0 ? (
            <ul>
              {commits.map((commit, index) => (
                <li key={index}>
                  <p><strong>Message:</strong> {commit.commit.message}</p>
                  <p><strong>Author:</strong> {commit.commit.author.name}</p>
                  <p><strong>Date:</strong> {new Date(commit.commit.author.date).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No commits available</p>
          )}
        </section>

        <section>
          <h2>Contributors for {selectedRepo}</h2>
          {contributors.length > 0 ? (
            <ul>
              {contributors.map((contributor) => (
                <li key={contributor.id}>
                  <p><strong>Name:</strong> {contributor.login}</p>
                  <p><strong>Contributions:</strong> {contributor.contributions}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No contributors available</p>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default SettingsPage;
