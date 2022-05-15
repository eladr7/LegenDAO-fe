/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable quotes */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            xs: "360px",
            sm: "640px",
            md: "760px",
            lg: "1020px",
            xl: "1280px",
            "2xl": "1360px",
            "3xl": "1400px",
            "4xl": "1590px",
            "5xl": "1900px",
            phone: "360px",
            "phone-2": "640px",
            tablet: "760px",
            "tablet-2": "1020px",
            desktop: "1280px",
            "desktop-2": "1360px",
            "desktop-3": "1400px",
            "desktop-4": "1590px",
            "desktop-5": "1800px",
        },
        extend: {
            animation: {
                "snowfall-fast-l-r": "snowfall-l-r 17s linear infinite 2s",
                "snowfall-fast-l-r-lg": "snowfall-l-r-lg 15s linear infinite 3s",
                "snowfall-normal-l-r": "snowfall-l-r 30s linear infinite",
                "snowfall-slow-l-r": "snowfall-l-r 50s linear infinite",
                "snowfall-fast-r-l": "snowfall-r-l 15s linear infinite",
                "snowfall-normal-r-l": "snowfall-r-l 30s linear infinite",
                "snowfall-slow-r-l": "snowfall-r-l 50s linear infinite",
            },
            keyframes: {
                "snowfall-l-r": {
                    "0%": {
                        transform: "translate3d(0, -20vh, 0)",
                    },
                    "100%": {
                        transform: "translate3d(10vw, 120vh, 0)",
                    },
                },
                "snowfall-l-r-lg": {
                    "0%": {
                        transform: "translate3d(0, -20vh, 0)",
                    },
                    "100%": {
                        transform: "translate3d(20vw, 150vh, 0)",
                    },
                },
                "snowfall-r-l": {
                    "0%": {
                        transform: "translate3d(0, -10vh, 0)",
                    },
                    "100%": {
                        transform: "translate3d(-10vw, 110vh, 0)",
                    },
                },
            },
            colors: {
                "primary-mint-lab": "#001b47",
                "primary-input-bg": "#001b47",
                "btn-from": "#985dd5",
                "btn-to": "#4e4acf",
                greywhite: "#AFB7C6",
            },
            fontFamily: {
                body: [
                    '"Montserrat"',
                    '"Open Sans"',
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
                emphasis: [
                    '"Average Sans"',
                    '"Montserrat"',
                    '"Open Sans"',
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
            fontSize: {
                "8xl": "6rem",
                "9xl": "7rem",
                "10xl": "8rem",
            },
            spacing: {
                header: "4rem",
                footer: "14rem",
                "icon-xs": "11px",
                "icon-sm": "1rem",
                icon: "24px",
                "icon-lg": "2rem",
                "input-sm": "2.25rem",
                input: "2.5rem",
                "input-md": "2.75rem",
                "input-lg": "3rem",
                "input-xl": "3.5rem",
                sidebar: "22.5rem",
                modal: "480px",
            },
        },
    },
    plugins: [
        require("@tailwindcss/line-clamp"),
        plugin(({ addUtilities }) => {
            addUtilities({
                ".animate-pause": {
                    "animation-play-state": "paused",
                },
                ".scrollbar-none": {
                    "scrollbar-width": "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
                ".scrollbar-thin": {
                    "scrollbar-width": "thin",
                    "&::-webkit-scrollbar": {
                        width: "5px",
                        height: "8px",
                        background: "rgba(255,255,255,0.02)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "rgba(255,255,255,0.1)",
                    },
                },
            });
        }),
    ],
};
