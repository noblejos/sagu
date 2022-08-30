import { useContext, useState } from "react";
import Spinner from "../../componets/helper/spinner";
import { AuthContext } from "../../context/authContext";
import { SignUpFormContext } from "../../context/signUpFormContext";
import signinHandshake from "../../services/post/signinHandshake";
import signupUser from "../../services/post/signupUser";
import uploadImage from "../../services/uploadImage";
import { useRouter } from "next/router";
import Web3 from "web3";
import axios from "axios";
import Step1 from "./Step1";
import Step2 from "./Step2";

export default function SignUp({ uploadPresets, cloudName }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const {
    formData,
    setFormData,
    activeStep,
    setActiveStep,
    FormErrors,
    setFormErrors,
  } = useContext(SignUpFormContext);
  const { address } = useContext(AuthContext);

  async function signUpUser() {
    const web3 = new Web3(window.ethereum);
    setIsPending(true);
    const profileImg = new FormData();
    profileImg.append("file", formData.profileimage);
    profileImg.append("upload_preset", "eifhxurctheuhwuqqyqsuanhquhwu");
    // await console.log(profileImg)
    const res = await uploadImage(profileImg, "greyhairedgallery");

    if (res.status == "error") {
      setIsPending(false);
      return setFormErrors({
        image:
          "Something is wrong with the image upload. Please try again later",
      });
    }

    const bannerImg = new FormData();
    bannerImg.append("file", formData.bannerimage);
    bannerImg.append("upload_preset", "eifhxurctheuhwuqqyqsuanhquhwu");
    const resB = await uploadImage(bannerImg, "greyhairedgallery");
    if (resB.status == "error") {
      setIsPending(false);
      return setFormErrors({
        image:
          "Something is wrong with the image upload. Please try again later",
      });
    }

    let form = {
      username: formData.username,
      email: formData.email,
      orgName: formData.communityName,
      bio: formData.desc,
      walletAddress: address,
      images: {
        profile: res.img,
        banner: resB.img,
      },
    };
    console.log({ form });

    const response = await signupUser(form);
    if (response.status == "error") {
      setIsPending(false);
      if (response.status == "error") {
        const errorObj = {};
        errorObj[response.field] = response.msg;

        if (["username", "email", "desc"].includes(response.field)) {
          console.log("among step1");
          setFormErrors(errorObj);
          return setActiveStep(1.0);
        }
        if (["profileimage", "bannerimage"].includes(response.field)) {
          console.log("among step2");
          setFormErrors(errorObj);
          return setActiveStep(2.0);
        }
        setFormErrors(errorObj);
        return;
      }
    }
    console.log(response.data);
    console.log("signed up");

    const account = await web3.eth.getAccounts();
    console.log({ account });

    // signin user
    const signinShake = await signinHandshake({
      walletAddress: address,
    });
    const signature = await web3.eth.personal.sign(signinShake.signMessage, address);
    const loginResponse = await axios.post("/api/apiSigninUser", {
      signature: signature,
      walletAddress: address,
    });
    if (loginResponse.data.status == "error") {
      setIsPending(false);
      // alert(loginResponse.data.msg || "Something went wrong");
      console.log("bad error");
      return;
    }

    // let socialData = {
    //   facebook: formData.facebook,
    //   twitter: formData.twitter,
    //   instagram: formData.discord,
    //   organization: loginResponse.data._id,
    // };
    // console.log({ socialData });

    // const headers = {
    //   "Content-type": "application/json",
    //   Authorization: "Bearer " + loginResponse.access_token,
    // };
    // const responseS = await addSocial({ socialData, headers });

    // if (responseS.status == "error") {

    //   console.log(responseS);
    //   console.log("error from social data")
    //   return;
    // }
    // console.log(responseS);
    // console.log({ ress: responseS });

    console.log(loginResponse);
    // alert("your user profile have been created and you have been logged in")
    // setIsPending(false)
    return router.push("/dashboard");
  }

  return (
    <div>
      {activeStep == 1.0 && <Step1 />}
      {activeStep == 2.0 && <Step2 submitForm={() => signUpUser()} />}
      {isPending && <Spinner />}
    </div>
  );
}
