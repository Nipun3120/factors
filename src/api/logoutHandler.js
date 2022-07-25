export const logoutHandler = () => {
  localStorage.removeItem("uid");
  window.location.replace("/signin");
};
