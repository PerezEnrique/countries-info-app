import { useState, useEffect } from "react";
import { getThemeStatus, setThemeStatus } from "../services/themeService";

export default function useTheme(themeKey, themeClass) {
	const [theme, setTheme] = useState(getThemeStatus(themeKey) == "true" ? true : false);

	useEffect(() => {
		if (theme) {
			document.documentElement.classList.add(themeClass);
		} else {
			document.documentElement.classList.remove(themeClass);
		}
		setThemeStatus(themeKey, theme);
	}, [theme, themeClass, themeKey]);

	return [theme, setTheme];
}
