import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";

function Darkmode() {
  const storeTheme = localStorage.getItem("theme");
  const systemScheme = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    () => setIsDark(true)
  );
  const [isDark, setIsDark] = useState(storeTheme == "dark" ? true : false);

  console.log(
    "isDark: " + isDark,
    "storeTheme: " + storeTheme,
    "systemScheme: " + systemScheme
  );

  useEffect(() => {
    
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="dark__toggle">
      <Toggle
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        icons={{ checked: "🌙", unchecked: "🔆" }}
        aria-label="Dark mode toggle"
      />
      <h3>{isDark ? "Darkmode" : "Lightmode"}</h3>
      {isDark ? (
        <Helmet>
          <link rel="stylesheet" href="/darktheme.css" />
        </Helmet>
      ) : (
        <Helmet>
          <link rel="stylesheet" href="/index.css" />
        </Helmet>
      )}
    </div>
  );
}

export default Darkmode;

// let items = document.querySelectorAll(".cards");
//   if (currentTheme == "dark") {
//     document.body.classList.remove("light__theme");
//     document.body.classList.add("dark__theme");
//     for (let item of items.values()) {
//       item.classList.remove("light__theme");
//     }
//   } else if (currentTheme == "light") {
//     document.body.classList.remove("dark__theme");
//     document.body.classList.add("light__theme");
//     for (let item of items.values()) {
//       item.classList.add("light__theme");
//       console.log(item);
//     }
//   } else {
//     document.body.classList.remove("dark__theme");
//     document.body.classList.remove("light__theme");
//   }

//   const handleClick = () => {
//     const systemScheme = window.matchMedia("(prefers-color-scheme: dark)");
//     if (systemScheme.matches) {
//       document.body.classList.toggle("light__theme");
//       let items = document.querySelectorAll(".cards");
//       for (let item of items.values()) {
//         item.classList.toggle("light__theme");
//       }
//       var theme = document.body.classList.contains("light__theme")
//         ? "light"
//         : "dark";
//     } else {
//       document.body.classList.toggle("dark__theme");
//       let items = document.querySelectorAll(".cards");
//       for (let item of items.values()) {
//         item.classList.toggle("dark__theme");
//       }
//       var theme = document.body.classList.contains("dark__theme")
//         ? "dark"
//         : "light";
//     }
//     localStorage.setItem("theme", theme);
//   };
