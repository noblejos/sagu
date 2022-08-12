

export default function Bio({ bio, errorObj }) {
 
 
  bio.length>100?errorObj.bio="Field must be less than 100 characters":null
  
    
  return errorObj;
}
