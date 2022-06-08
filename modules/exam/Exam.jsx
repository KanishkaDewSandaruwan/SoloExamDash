import AddList from '../examCrud/AddList';
import formData from './formData.json';
// import { useContext } from "react";
// import { Redirect } from "react-router-dom";
// import { AuthContext } from "../../context/auth";

export default function Language() {
  // const { userData1 } = useContext(AuthContext);
  // if(!userData1.accessed){
  //   return <Redirect to={{ pathname: '/profile' }} />
  // }

  return <AddList moduleName="Exam Management" formData={formData} table={true} />;
}
