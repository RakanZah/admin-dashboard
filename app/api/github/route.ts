import { NextResponse } from 'next/server';

// Organization name
const orgName = 'zahmaola';
// GitHub Token (Replace with your actual token)

const token = process.env.GITHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const repoName = searchParams.get('repo');

  console.log('Received API request:', { type, repoName });

  try {
    if (type === 'repos') {
      console.log('Fetching repositories...');
      const response = await fetch(`https://api.github.com/orgs/${orgName}/repos`, { headers });

      if (!response.ok) {
        console.error('Error fetching repos:', response.status, response.statusText);
        return NextResponse.json(
          { error: 'Failed to fetch repositories' },
          { status: response.status }
        );
      }

      const repos = await response.json();
      return NextResponse.json(repos);
    }

    if (type === 'commits' && repoName) {
      console.log(`Fetching commits for repo: ${repoName}`);
      const response = await fetch(
        `https://api.github.com/repos/${orgName}/${repoName}/commits`,
        { headers }
      );

      if (!response.ok) {
        console.error('Error fetching commits:', response.status, response.statusText);
        return NextResponse.json(
          { error: `Failed to fetch commits for ${repoName}` },
          { status: response.status }
        );
      }

      const commits = await response.json();
      return NextResponse.json(commits);
    }

    if (type === 'contributors' && repoName) {
      console.log(`Fetching contributors for repo: ${repoName}`);
      const response = await fetch(
        `https://api.github.com/repos/${orgName}/${repoName}/contributors`,
        { headers }
      );

      if (!response.ok) {
        console.error('Error fetching contributors:', response.status, response.statusText);
        return NextResponse.json(
          { error: `Failed to fetch contributors for ${repoName}` },
          { status: response.status }
        );
      }

      const contributors = await response.json();
      return NextResponse.json(contributors);
    }

    return NextResponse.json(
      { error: 'Invalid type or missing parameters' },
      { status: 400 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'An error occurred', details: error }, { status: 500 });
  }
}
