

export default function Username({username, errorObj}) {
  let regexUsername=/^[a-z][a-z0-9]*$/;
  !username?errorObj.username="Field is required":
  username.length>30 || username.length<3?errorObj.username="Field must be within 3-to-30 letters":
  regexUsername.test(username)== false
   ? (errorObj.username = "username must contain only lowercase letters and numbers and must start with a letter"):
   null
  return errorObj;
}
