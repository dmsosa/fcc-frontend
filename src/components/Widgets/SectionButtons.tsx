import { useState } from "react";

type TSection = "projekt" | "beschreibung" | "footer";
const sections: TSection[] = ["projekt", "beschreibung", "footer"];
function SectionButtons() {
    const [targetSection, setTargetSection] = useState<TSection>('projekt');
    return (
        <nav id="section-nav" className="section-nav">
            <ul className={'links-ul links-ul-vertical'}>
            {sections.map((section) => 
                {
                const activeClass = targetSection === section;    
                    
                return (
                <a href={section} className={activeClass ? 'active':''} onClick={() => setTargetSection(section)}>
                    {section}
                </a>
                )}
            )}
            </ul>
        </nav>
        
    );
}
export default SectionButtons;