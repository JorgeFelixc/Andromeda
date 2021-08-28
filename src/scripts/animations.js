import anime from "animejs";

export const AnimationTitle = () => {
  anime({
    targets: ".text-slogan",
    fontSize: 40,
    opacity: 1,
    easing: "easeInOutQuad",
  });
};

export const AnimationMenu = () => {
  anime({
    targets: ".wrapper-menu",
    right: "30px",
    easing: "easeInOutQuad",
  });
};
