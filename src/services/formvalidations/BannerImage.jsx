export default function BannerImage({ bannerimage, errorObj }) {
    // // for bio
    !bannerimage ? (errorObj.bannerimage = "Field is required") : null;
    
    return errorObj;
  }
  