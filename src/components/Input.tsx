import { useState } from "react";
import type {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { cn } from "../Lip/utils";
import { Button } from "./ui/button";

type InputType = {
  label?: string;
  name: string;
  type?: string;
  id?: string;
  errors?: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  placeholder?: string;
  validationOptions?: RegisterOptions;
  className?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
function Input({
  defaultValue,
  label,
  name,
  type,
  id,
  errors,

  register,
  placeholder,
  validationOptions,
  className,
  onChange,
}: InputType) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleInputType = () => {
    if (type == "password") {
      return showPassword ? "text" : "password";
    }
    return type;
  };
  return (
    <div className="flex flex-col  gap-1  w-full ">
      {label && (
        <label
          className="flex justify-start font-medium text-zinc-900 capitalize"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            ` outline-none border-2 border-gray-200 p-2.5 rounded-lg  text-sm w-full  ${
              errors![name] ? "border-red-600" : "border-gray-500"
            }`,
            className
          )}
          id={id}
          type={toggleInputType()}
          placeholder={placeholder}
          {...register(name, validationOptions)}
          defaultValue={defaultValue}
          onChange={onChange}
        />
        {type == "password" ? (
          <Button
            type="button"
            className="bg-white text-brown-500 text-4xl absolute right-1 border-none shadow-none hover:bg-white   bottom-1"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </Button>
        ) : (
          ""
        )}
      </div>
      {errors![name] && errors![name].message && (
        <div className="relative">
          <span className="text-xs font-medium absolute  text-red-500 ">
            {errors![name].message.toString()}
          </span>
        </div>
      )}
    </div>
  );
}

export default Input;
