import type { TProjektKarte } from "../components/home/ProjektKarte";
import ProjektKarte, { karteArray } from "../components/home/ProjektKarte";

export default function Home () {
    
    return (
        <section >
            <div className='container'>
                <div className="row">
                    <h1>Free Code Camp: Frontend Challenges</h1>
                    <p>Welcome to my collection of frontend challenges from Free Code Camp. Here, you'll find a variety of projects that showcase my skills in HTML, CSS, and JavaScript. Each challenge is designed to test different aspects of frontend development, from responsive design to interactive features.</p>
                    <p>Feel free to explore the projects and see how I've approached each challenge. Whether you're a fellow developer looking for inspiration or someone interested in learning more about frontend development, I hope you find these challenges both informative and engaging.</p>
                    <p>Happy coding!</p>
                </div>
                <div className="row">
                    <div className="d-flex justify-content-center align-items-start flex-wrap gap-2">
                        {karteArray.map((karte: TProjektKarte) => {
                            return (<ProjektKarte title={karte.title} description={karte.description} img={karte.img} link={karte.link} repo={karte.repo}/>)
                        })}
                    </div>
                </div>
                <div className="row">
                    <p>Lass mich wissen, ob es cool war!</p>
                </div>
                    
            </div>       
    </section>
    
  );
}

