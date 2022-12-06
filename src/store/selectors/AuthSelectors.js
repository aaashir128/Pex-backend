export const isAuthenticated = (state) => {
  const usr = localStorage.getItem("user");
  console.log(usr,"usr");
  if (usr) return true;
  return false;
};
