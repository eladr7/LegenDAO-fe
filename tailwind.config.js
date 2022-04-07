/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable quotes */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-mint-lab": "#001b47",
            },
            fontFamily: {
                body: [
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
            spacing: {
                header: "4rem",
                footer: "12rem",
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
                        background: "#dddddd",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#777777",
                    },
                },
            });
        }),
    ],
};
