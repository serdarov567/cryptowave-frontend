const isSignedIn =
localStorage.getItem("email") !== null &&
localStorage.getItem("token") !== null;

export {
  isSignedIn
}