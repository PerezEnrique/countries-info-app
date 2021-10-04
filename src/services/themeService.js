export function getThemeStatus(themeKey) {
	return localStorage.getItem(themeKey);
}

export function setThemeStatus(themeKey, status) {
	localStorage.setItem(themeKey, status);
}
