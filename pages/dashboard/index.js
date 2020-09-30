import Link from 'next/link';
import { useState, useEffect } from 'react';

import Nav from '../../components/nav';

const Project = ({ project }) => {
  const { name, description, project_id } = project;
  return (
    <div className="flex flex-col justify-start items-start">
      <h3>{name}</h3>
      <p>{description}</p>
      <Link href={`/dashboard/projects/${project_id}`}>
          <a className="text-blue-500 underline">View Project</a>
      </Link>
    </div>
  )
};

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch('https://api.reactpp.com/api/project', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await resp.json();
        if (data.length) {
          setLoaded(true);
          setProjects(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [loaded]);

  const projectsList = projects.map((project, i) => <Project key={`project${i}`} project={project} />)
  return (
    <>
    <Nav />
    <div className="flex flex-col items-center">
      <h2>Dashboard</h2>
      <div className="flex flex-col items-start">
        {loaded && projectsList}
        <Link href="/dashboard/add">
          <a className="text-blue-500 underline">Add a Project</a>
        </Link>
      </div>
    </div>
    </>
  );
}
