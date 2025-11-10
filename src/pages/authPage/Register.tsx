/* eslint-disable react-hooks/exhaustive-deps */
import Input from "@/components/Input";
import SelectUi from "@/components/Selectui";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRegister } from "./useRegister";

function Register() {
  const options = [
    { value: "EMPLOYEE", key: "employee" },
    { value: "PATRON", key: " patron" },
  ];

  const { sendData, handleData, restData, RegisterMutation, setRestData } =
    useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ mode: "all" });
  useEffect(() => {
    if (RegisterMutation.isSuccess) {
      reset();
      setRestData(undefined);
    }
  }, [RegisterMutation.isSuccess, restData]);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1  w-full h-screen">
      <form
        onSubmit={handleSubmit(sendData)}
        className="flex flex-col justify-center items-center gap-8 px-16 py-4 bg-brown-50  h-screen  overflow-hidden"
      >
        <Input
          className="border-brown-500"
          label="firstName:"
          name="firstName"
          register={register}
          errors={errors}
          validationOptions={{ required: "firstName requried" }}
        />
        <Input
          className="border-brown-500"
          label="lastName:"
          name="lastName"
          register={register}
          errors={errors}
          validationOptions={{ required: "lastName requried" }}
        />
        <Input
          className="border-brown-500 "
          type="email"
          label="email:"
          name="email"
          register={register}
          errors={errors}
          validationOptions={{
            required: "email requried",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <Input
          className="border-brown-500"
          type="password"
          label="password:"
          name="password"
          register={register}
          errors={errors}
          validationOptions={{
            required: "password requried",
          }}
        />
        <SelectUi
          options={options}
          defaultValue={restData?.type}
          placeholder="select role"
          onChange={(value) => {
            handleData({
              key: "type",
              value,
            });
            setValue("type", value, { shouldValidate: true });
          }}
        />

        <Button
          disabled={RegisterMutation.isPending}
          type="submit"
          className="uppercase  font-medium bg-brown-500 w-full mt-5"
        >
          {RegisterMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "register"
          )}
        </Button>
        <div className="text-center flex items-center justify-center text-sm">
          <span className="opacity-80">alraedy have an account ?</span>
          <a href="/login" className=" text-brown-500  font-medium ml-1">
            sign in
          </a>
        </div>
      </form>
      <img
        className="md:flex hidden w-full h-screen object-cover"
        src="/login.jpg"
        alt=""
      />
    </div>
  );
}

export default Register;
