import anime from "animejs";

const particleOrbital = () => {
  const postArray = new Float32Array(particlesLength * 3);
  for (let i = 0; i < particlesLength * 3; i++) {
    postArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
  }
  return postArray;
};

const particleNoise = () => {
  const postArray = new Float32Array(particlesLength * 3);
  for (let i = 0; i < particlesLength * 3; i++) {
    postArray[i] = Math.tan(i * 0.00008) + Math.sin(i * 0.8) - 0.9;
  }
  return postArray;
};

export const particleType = {
  orbital: particleOrbital,
  noise: particleNoise,
};
