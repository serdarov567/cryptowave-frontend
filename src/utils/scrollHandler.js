const scrollHandler = (section, navbarHeight) => {
  let sectionName = "Home";

  switch (section) {
    case "aboutus": {
      sectionName = "About";
      break;
    }
    case "plans": {
      sectionName = "Plans";
      break;
    }
    case "contact": {
      sectionName = "Contact";
      break;
    }
    default: {
      break;
    }
  }
  setTimeout(() => {
    if (global.location.pathname === "/") {
      let top = document.getElementById(sectionName).offsetTop - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, 0);
};

export { scrollHandler };
