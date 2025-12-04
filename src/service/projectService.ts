import fcc1 from '../assets/img/project/fcc1.webp';
import fcc2 from '../assets/img/project/fcc2.jpeg';
import fcc3 from '../assets/img/project/fcc3.jpg';
import fcc4 from '../assets/img/project/fcc4.webp';
import fcc5 from '../assets/img/project/fcc5.jpg';

export type TProject = {
    title: string;
    description: string;
    img: string;
    link: string;
    repo: string;
}


export const PROJECTS_ARRAY: TProject[] = [
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