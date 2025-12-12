import ProjektKarte from "../components/Home/ProjektKarte";
import { PROJECTS_ARRAY, type TProject } from "../service/projectService";

export default function Home () {
    
    return (
        <>
        <section className="section scroll-snap-child invisible-scrollbar">
            <div className='container'>
                <div className="row">
                    <h1>Free Code Camp: Frontend Challenges</h1>
                    <p className="text-body-secondary">Welcome to my collection of frontend challenges from Free Code Camp. Here, you'll find a variety of projects that showcase my skills in HTML, CSS, and JavaScript. Each challenge is designed to test different aspects of frontend development, from responsive design to interactive features.</p>
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
        </section>
        <section id='beschreibung' className='h-100vh bg1 scroll-snap-child'></section>
        <section id='beschreibung' className='h-100vh bg2 scroll-snap-child'></section>
        <section id='beschreibung' className='h-100vh bg3 scroll-snap-child'></section>
        </>

    
  );
}

