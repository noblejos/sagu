import Connect from "../../componets/auth/Connect";
import Nav from "../../componets/helper/Nav";
import AuthProvider from "../../context/authContext";
import SignUpFormProvider from "../../context/signUpFormContext";

export default function connect({uploadPresets, cloudName,loggedUser }) {
  return (
    <div>
      <AuthProvider>
      <SignUpFormProvider>
        <div>
        <Nav loggedUser={loggedUser}/>
        <Connect uploadPresets={uploadPresets} cloudName={cloudName}/>
        
        </div>
      </SignUpFormProvider>
      </AuthProvider>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { cookies } = req;
  console.log("where are you");
  const jwt = cookies.UserJWT;
  const secret = process.env.SECRET || "no hacking here";
  const uploadPresets = process.env.CLOUD_PRESETS;
  const cloudName = process.env.CLOUD_NAME;
  let loggedUser;
  try {
    loggedUser = verify(jwt, secret);
  } catch (e) {
    console.log(e);
    loggedUser = {};
  }
  
    return { props: { uploadPresets, cloudName,loggedUser } };
  
}