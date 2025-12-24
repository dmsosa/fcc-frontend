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
        <section className="section invisible-scrollbar">
            <div className='container bg-body-primary'>
                <div className="row">
                    <h1 className="font-sizee-6">
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
        </section>
        <section className='section min-vh-100 bg-primary'></section>
        <section className='section min-vh-100 bg-secondary'></section>
        <section className='section min-vh-100 bg-body-tertiary'></section>
        </>

    
  );
}

