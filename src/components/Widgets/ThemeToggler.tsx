import { type MouseEvent } from "react";
import { useThemeContext } from "../../context/themeContext";

export default function ThemeToggler ({ svgAttributes } : { svgAttributes?: React.SVGAttributes<SVGSVGElement> }) {

    const { theme, setThemeToContextAndDocument } = useThemeContext();
            console.log('rendered');

    const toggleButtonAndThemeContext = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (theme === "dark") {
            setThemeToContextAndDocument('light');
        } else {
            setThemeToContextAndDocument('dark');
        }
    }
    //active is false
    //theme changes to light, themeToggler re render
    //theme is dark
    //changed theme to dark again, brandLogo re render
    //changed active to true
    //toggler re renders, theme is dark
    //active is true
    //

    return (
    <button
  className={`theme-toggle ${theme === "dark" ? 'theme-toggle--toggled':''}`}
  type="button"
  title="Toggle theme"
  aria-label="Toggle theme"
  onClick={toggleButtonAndThemeContext}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    stroke-linecap="round"
    className="theme-toggle__classic"
    viewBox="0 0 32 32"
    {...svgAttributes}
  >
    <clipPath id="theme-toggle__classic__cutout">
      <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
    </clipPath>
    <g clip-path="url(#theme-toggle__classic__cutout)">
      <circle cx="16" cy="16" r="9.34" />
      <g stroke="currentColor" stroke-width="1.5">
        <path d="M16 5.5v-4" />
        <path d="M16 30.5v-4" />
        <path d="M1.5 16h4" />
        <path d="M26.5 16h4" />
        <path d="m23.4 8.6 2.8-2.8" />
        <path d="m5.7 26.3 2.9-2.9" />
        <path d="m5.8 5.8 2.8 2.8" />
        <path d="m23.4 23.4 2.9 2.9" />
      </g>
    </g>
  </svg>
</button>
    
  );
};
