import { FaGithub } from 'react-icons/fa';

import fcc1 from '../../assets/img/project/fcc1.webp';
import fcc2 from '../../assets/img/project/fcc2.jpeg';
import fcc3 from '../../assets/img/project/fcc3.jpg';
import fcc4 from '../../assets/img/project/fcc4.webp';
import fcc5 from '../../assets/img/project/fcc5.jpg';

export interface IProjektKarteProps {
    title: string;
    description: string;
    img: string;
    link: string;
    repo: string;
}
export type TProjektKarte = {
    title: string;
    description: string;
    img: string;
    link: string;
    repo: string;
}

export const karteArray: TProjektKarte[] = [
    {
    title: '01-FCC-Random-Quote-Machine',
    description: 'A simple random quote machine that fetches quotes from an API and displays them to the user. The user can click a button to generate a new quote and also has the option to tweet the quote directly from the app.',
    img: fcc1,
    link: '',
    repo: '',
},
{
    title: '02-FCC-Markdown-Previewer',
    description: 'A simple random quote machine that fetches quotes from an API and displays them to the user. The user can click a button to generate a new quote and also has the option to tweet the quote directly from the app.',
    img: fcc2,
    link: '',
    repo: '',
},
{
    title: '03-FCC-Drum-Machine',
    description: 'A simple random quote machine that fetches quotes from an API and displays them to the user. The user can click a button to generate a new quote and also has the option to tweet the quote directly from the app.',
    img: fcc3,
    link: '',
    repo: '',
},
{
    title: '04-FCC-Calculator',
    description: 'A simple random quote machine that fetches quotes from an API and displays them to the user. The user can click a button to generate a new quote and also has the option to tweet the quote directly from the app.',
    img: fcc4,
    link: '',
    repo: '',
},
{
    title: '05-FCC-Pomodoro',
    description: 'A simple random quote machine that fetches quotes from an API and displays them to the user. The user can click a button to generate a new quote and also has the option to tweet the quote directly from the app.',
    img: fcc5,
    link: '',
    repo: '',
}
]
export default function ProjektKarte ({ title, description, img, link, repo }: IProjektKarteProps) {
  return (
    <div className='projekt-karte'>
        <img src={img} alt={`${title}'s project image`} className='projekt-karte-background' />
        <div className="projekt-karte-front">
            <h5>{title}</h5>
            <a href={repo} className='svg-link'><FaGithub/></a>
        </div>
        <div className="projekt-karte-screen">
            <p>{description}</p>
            <a className="btn btn-primary" href={link}>Watch now</a>
        </div>
    </div>
  );
}
