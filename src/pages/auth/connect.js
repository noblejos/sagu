import Connect from "../../componets/auth/Connect";
import AuthProvider from "../../context/authContext";
import SignUpFormProvider from "../../context/signUpFormContext";

export default function connect({uploadPresets, cloudName }) {
  return (
    <div>
      <AuthProvider>
      <SignUpFormProvider>
        <Connect uploadPresets={uploadPresets} cloudName={cloudName}/>
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
  try {
    verify(jwt, secret);
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  } catch (e) {
    return { props: { uploadPresets, cloudName } };
  }
}