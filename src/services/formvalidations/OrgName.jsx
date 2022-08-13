export default function OrgName({ orgname, errorObj }) {
  !orgname?errorObj.orgname="Field is required":
orgname.length>30 || orgname.length<3?errorObj.orgname="Field must be within 3-to-30 letters":""

  return errorObj;
}
