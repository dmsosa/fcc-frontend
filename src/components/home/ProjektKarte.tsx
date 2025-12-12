import { FaGithub } from 'react-icons/fa';
import type { TProject } from '../../service/projectService';



export interface IProjektKarteProps {
    project: TProject;
}


export default function ProjektKarte ({ project }: IProjektKarteProps) {
    const { title, description, img, link, repo } = project;
  return (
    <div className='projekt-karte'>
        <img src={img} alt={`${title}'s project image`} className='projekt-karte-background' />
        <div className="projekt-karte-front">
            <h5>{title}</h5>
            <a href={repo} className='svg-link'><FaGithub/></a>
        </div>
        <div className="projekt-karte-screen">
            <p className='text-body-secondary'>{description}</p>
            <a className="btn btn-primary" href={link}>Watch now</a>
        </div>
    </div>
  );
}
