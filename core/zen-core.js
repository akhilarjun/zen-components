export const validateZen = () => {
  if (!window.zen) {
    console.warn("Zen is not initiated");
    window.zen = {};
  }
};
