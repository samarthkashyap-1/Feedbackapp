/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				primary: ["Montserrat", "sans-serif"],
			},
			colors: {
				primary: "#ffffff",
				secondary: "#e5e5e5",
				sec_dark: "#102542",
				white: "#fff",
				black: "#000",
				gray: {
					100: "#f7fafc",
					// ...
					900: "#1a202c",
				},
			},
			spacing: {
				"fluid-1": "clamp(1.31rem, calc(0.65rem + 3.29vw), 3.00rem)",
				"fluid-2": "clamp(1.31rem, calc(0.07rem + 6.22vw), 4.50rem)",
			},
			fontSize: {
				"fluid-1": "clamp(1.89rem, calc(1.48rem + 2.03vw), 2.93rem)",
				"fluid-2": "clamp(3.27rem, calc(2.31rem + 4.79vw), 5.72rem)",
			}
		},
		screens: {
			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }

			md: { max: "820px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
		},
	},
	plugins: [],
};
