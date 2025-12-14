import { useThemeContext } from "../../context/themeContext";

export default function ThemeToggler ({ svgAttributes } : { svgAttributes?: React.SVGAttributes<SVGSVGElement> }) {

    const { theme, setTheme } = useThemeContext();
    const handleClick = () => {
        setTheme(theme === "dark" ? "light":"dark");
    }

    return (
    <a
  className={`theme-toggle link-regular ${theme === "light" ? 'theme-toggle--toggled':''}`}
  type="button"
  title="Toggle theme"
  aria-label="Toggle theme"
  onClick={handleClick}
  href="#"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    strokeLinecap="round"
    className="theme-toggle__classic"
    viewBox="0 0 32 32"
    {...svgAttributes}
  >
    <clipPath id="theme-toggle__classic__cutout">
      <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
    </clipPath>
    <g clipPath="url(#theme-toggle__classic__cutout)">
      <circle cx="16" cy="16" r="9.34" />
      <g>
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
</a>
    
  );
};
