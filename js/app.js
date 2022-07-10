function iniciarApp() {
  crearGaleria();
  scrollNav();
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".producto");
  enlaces.forEach((enlace) => {
    enlaces.addEventListener("scroll", function (e) {
      const seccion = document.querySelector(e.target.attributes.href.value);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}
