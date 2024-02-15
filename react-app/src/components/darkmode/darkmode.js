export default function themeToggle() {
  const btn = document.querySelector(".btn-toggle");
  const systemScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme == "dark") {
    console.log("Dark");
  } else {
    console.log("Light");
  }

  btn.addEventListener("click", function () {
    if (systemScheme.matches) {
      console.log("Dark");
    } else {
      console.log("Light");
    }
  });
}
