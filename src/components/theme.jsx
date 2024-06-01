import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";


export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const currentTheme = theme === 'light' ? 'dark' : 'light'
  
    return (
        <button className="border border-2 rounded-full px-3.5 py-2 fixed bottom-4 right-4 " onClick={() => setTheme(currentTheme)}>
            {theme === 'light' ? <FontAwesomeIcon icon={faLightbulb} /> : <FontAwesomeIcon icon={faLightbulb} />}
        </button>
    )
  };