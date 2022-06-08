import AddList from '../ocrcrud/AddList';
import formData from './formData.json';
// import { useContext } from "react";
// import { Redirect } from "react-router-dom";
// import { AuthContext } from "../../context/auth";

export default function WaterMark() {
  // const { userData1 } = useContext(AuthContext);
  // if(!userData1.accessed){
  //   return <Redirect to={{ pathname: '/profile' }} />
  // }

  return <AddList moduleName="OCR Management" formData={formData} table={true} />;
}
