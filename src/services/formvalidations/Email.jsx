
export default function Email({email, errorObj}) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    !email
      ? (errorObj.email = "Field is required")
      : regexEmail.test(email) == false
      ? (errorObj.email = "Field is not a valid email address")
      : null;
    return errorObj
}
