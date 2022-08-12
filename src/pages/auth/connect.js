import Connect from "../../componets/auth/Connect";
import AuthProvider from "../../context/authContext";

export default function connect() {
  return (
    <div>
      <AuthProvider>

        <Connect/>

      </AuthProvider>
    </div>
  )
}
