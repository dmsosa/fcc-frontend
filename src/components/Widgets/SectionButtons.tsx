import { useState } from "react";
import { FaHome } from "react-icons/fa";
import type { TIconLink } from "./IconList";

type TSection = "projekt" | "beschreibung" | "footer";
const sections: TSection[] = ["projekt", "beschreibung", "footer"];
const icons: TIconLink[] = [
  {
    title: 'Home',
    href: '/home',
    svg: <FaHome></FaHome>
  },
  {
  title: 'Dashboard',
  href: '/dashboard',
  svg: <FaHome></FaHome>
},
{
  title: 'GitHub',
  href: 'https://github.com/dmsosa',
  svg: <FaHome></FaHome>
},
{
  title: 'CV',
  href: '/cv',
  svg: <FaHome></FaHome>
}
]
function SectionButtons() {
    const [targetSection, setTargetSection] = useState<TSection>('projekt');
    if(!icons) return;
    return (
        <nav id="section-nav" className="section-nav">
            <ul className={'links-ul links-ul-vertical'}>
            {sections.map((section) => 
                {
                const activeClass = targetSection === section;    
                    
                return (
                <a key={section} href={section} className={activeClass ? 'active':''} onClick={() => setTargetSection(section)}>
                    {section}
                </a>
                )}
            )}
            </ul>
        </nav>
        
    );
}
export default SectionButtons;