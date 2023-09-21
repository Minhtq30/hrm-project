const requireAuth = (to, from, next) => {
  let isAuthenticated = localStorage.getItem("authenticated");
  if (!isAuthenticated && to.name !== "Login") {
    next({ name: "Login" });
  } else next();
};
export default requireAuth;
