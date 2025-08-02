import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerFormControls } from "@/config";
import CommonForm from "@/components/common/form";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { toast } from "sonner"; // or wherever your toast hook is

const initialState = {
    userName:'',
    email:'',
    password:''
}

function AuthRegister () {
    const [formData , setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
function onSubmit(event) {
  event.preventDefault();
  dispatch(registerUser(formData)).then((data)=>{
    if (data?.payload?.success) {
        toast(data?.payload?.message); // ✅ simple
        navigate("/auth/login");
      } else {
        toast(data?.payload?.message); // ✅ still simple
      }
      });
  }
  
console.log("Form Data:", formData);
     return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
       <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister ;