import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { useLogin } from "./useLogin";

function Login() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ mode: "all" });
  const { loginMutation, sendData } = useLogin();
  return (
    <div className="grid md:grid-cols-2 grid-cols-1  w-full h-screen">
      <form
        className=" flex flex-col gap-8 bg-brown-50 py-4 px-16 pt-16 pb-16 w-full"
        onSubmit={handleSubmit(sendData)}
      >
        <h3 className="text-4xl mb-10 font-medium text-brown-500-700 relative w-[100px] ">
          Login
          <span className="w-8/12 h-1 -bottom-5 -left-1  bg-brown-500 rounded-3xl m-2 absolute "></span>
        </h3>
        <Input
          className="border-brown-500 "
          register={register}
          errors={errors}
          name="email"
          label="email:"
          validationOptions={{ required: "email requried" }}
        />
        <Input
          className="border-brown-500 "
          register={register}
          errors={errors}
          name="password"
          type="password"
          label="password:"
          validationOptions={{ required: "password required" }}
        />
        <Button
          disabled={loginMutation.isPending}
          type="submit"
          className="bg-brown-500 mt-5"
        >
          login
        </Button>
        <div className="text-center flex items-center justify-center text-sm">
          <span className="opacity-80">Dont have an account ?</span>
          <a href="/register" className=" text-brown-500  font-medium ml-1">
            sign up
          </a>
        </div>
      </form>
      <img
        className="md:flex hidden w-full h-screen object-cover"
        src="../../../images/login.jpg"
        alt=""
      />
    </div>
  );
}

export default Login;
