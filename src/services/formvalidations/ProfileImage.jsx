export default function ProfileImage({ profileimage, errorObj }) {
    // // for bio
    !profileimage ? (errorObj.profileimage = "Field is required") : null;
    return errorObj;
  }
  