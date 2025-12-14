import { FaHome } from "react-icons/fa";
import ProjektKarte from "../components/Home/ProjektKarte";
import { IconList, type TIconLink } from "../components/Widgets/IconList";
import { PROJECTS_ARRAY, type TProject } from "../service/projectService";
import { BsHouseExclamation } from "react-icons/bs";

const bioLinks: TIconLink[] = [
  { title: 'home', href: '/', active: false, svg: <FaHome /> },
  { title: 'home', href: '/', active: false, svg: <FaHome /> },
  { title: 'home', href: '/', active: false, svg: <FaHome /> },
  { title: 'home', href: '/', active: false, svg: <FaHome /> },
  {
    title: 'Follow for high-quality educational content',
    href: '/',
    active: false,
    svg: <BsHouseExclamation />
  }
]
export default function Home () {
    
    return (
        <>
        <section className="section h-100vh overflow-hidden">
            <div className='container scroll-snap-child min-h-100 bg-body-primary invisible-scrollbar'>
                <div className="row">
                    <h1>
                        <span>Hi,</span>
                        <span>I'm Durian!</span>
                    </h1>
                    <hr></hr>
                    <IconList iconLinks={bioLinks} expanded></IconList>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-center align-items-start flex-wrap gap-2">
                        {PROJECTS_ARRAY.map((p: TProject) => {
                            return (<ProjektKarte key={p.title} project={p}/>)
                        })}
                    </div>
                </div>
                <div className="row">
                    <p>Lass mich wissen, ob es cool war!</p>
                </div>              
            </div>
            <div className='container scroll-snap-child min-h-100 bg-body-secondary invisible-scrollbar'>
                <div className="row">
                    <h1>Free Code Camp: Frontend Challenges</h1>
                    <p className="swatch-secondary">Welcome to my collection of frontend challenges from Free Code Camp. Here, you'll find a variety of projects that showcase my skills in HTML, CSS, and JavaScript. Each challenge is designed to test different aspects of frontend development, from responsive design to interactive features.</p>
                    <p>Feel free to explore the projects and see how I've approached each challenge. Whether you're a fellow developer looking for inspiration or someone interested in learning more about frontend development, I hope you find these challenges both informative and engaging.</p>
                    <p>Happy coding!</p>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-center align-items-start flex-wrap gap-2">
                        {PROJECTS_ARRAY.map((p: TProject) => {
                            return (<ProjektKarte key={p.title} project={p}/>)
                        })}
                    </div>
                </div>
                <div className="row">
                    <p>Lass mich wissen, ob es cool war!</p>
                </div>              
            </div>
            <div className='container scroll-snap-child min-h-100 bg-body-primary invisible-scrollbar'>
                <div className="row">
                    <h1>Free Code Camp: Frontend Challenges</h1>
                    <p className="swatch-secondary">Welcome to my collection of frontend challenges from Free Code Camp. Here, you'll find a variety of projects that showcase my skills in HTML, CSS, and JavaScript. Each challenge is designed to test different aspects of frontend development, from responsive design to interactive features.</p>
                    <p>Feel free to explore the projects and see how I've approached each challenge. Whether you're a fellow developer looking for inspiration or someone interested in learning more about frontend development, I hope you find these challenges both informative and engaging.</p>
                    <p>Happy coding!</p>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-center bg-body-secondary align-items-start flex-wrap gap-2">
                        {PROJECTS_ARRAY.map((p: TProject) => {
                            return (<ProjektKarte key={p.title} project={p}/>)
                        })}
                    </div>
                </div>
                <div className="row">
                    <p>Lass mich wissen, ob es cool war!</p>
                </div>              
            </div>       
        </section>
        <section id='beschreibung' className='h-100vh bg1 scroll-snap-child'></section>
        <section id='beschreibung' className='h-100vh bg2 scroll-snap-child'></section>
        <section id='beschreibung' className='h-100vh bg3 scroll-snap-child'></section>
        </>

    
  );
}

