import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";

function Darkmode() {
  const storeTheme = localStorage.getItem("theme");
  const systemScheme = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });
  const [isDark, setIsDark] = useState(storeTheme == "dark" ? true : false);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark, systemScheme]);

  useEffect(() => {
    setIsDark(systemScheme);
  }, [systemScheme]);

  console.log(
    `isdark: ${isDark}, system: ${systemScheme}, store: ${storeTheme}`
  );
  return (
    <div className="dark__toggle">
      <Toggle
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        icons={{ checked: "🌙", unchecked: "🔆" }}
        aria-label="Dark mode toggle"
      />
      <p>{isDark ? "Darkmode" : "Lightmode"}</p>
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
