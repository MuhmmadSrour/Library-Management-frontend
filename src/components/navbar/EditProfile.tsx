import { token, UserInfo } from "@/context/signal";
import { useSignals } from "@preact/signals-react/runtime";
import { deleteCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { FaSortDown } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Input from "../Input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import useNavbar from "./useNavbar";

function EditProfile() {
  useSignals();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { sendData } = useNavbar();
  return (
    <div className=" sidebar absolute border border-brown-500 ease-in-out duration-300 rounded-l-lg shadow-lg z-50 bg-brown-50 flex flex-col  py-8 px-4 gap-8   bottom-90 -right-4 transition-all w-[300px] h-fit">
      <div className="absolute  -top-3 right-6 ">
        <FaSortDown className="text-xl text-brown-300  " />
      </div>
      <div className="flex   border gap-1  border-brown-500 rounded-xl p-2 ">
        <h3 className="text-sm font-medium   text-brown-300   ">first name:</h3>
        <span className="text-black text-base ">
          {UserInfo.value?.firstName}
        </span>
      </div>
      <div className="flex border gap-1  border-brown-500 p-2 rounded-xl">
        <h3 className="text-sm font-medium flex flex-col    text-brown-300   ">
          last name:
        </h3>
        <span className="text-black text-base ">
          {UserInfo.value?.lastName}
        </span>
      </div>
      <div className="flex gap-1 border   border-brown-500 p-2 rounded-xl">
        <h3 className="text-sm font-medium w-fit  relative flex flex-col text-brown-300   ">
          email:
        </h3>
        <span className="text-black max-w-full break-all text-base  ">
          {UserInfo.value?.email}
        </span>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-brown-500 text-[18px]  text-white p-2   border-brown-500">
            Edit profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border-brown-500">
          <DialogHeader>
            <DialogTitle className="text-md">Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(sendData)}>
            <Input
              name="firstName"
              label="firstName"
              register={register}
              errors={errors}
              defaultValue={UserInfo.value?.firstName}
            />
            <Input
              name="lastName"
              label="lastName"
              register={register}
              errors={errors}
              defaultValue={UserInfo.value?.lastName}
            />
            <Input
              name="email"
              label="email"
              register={register}
              errors={errors}
              defaultValue={UserInfo.value?.email}
            />
            <Input
              name="oldPassword"
              label="password"
              register={register}
              errors={errors}
              type="OldPassword"
              placeholder="enter the old password "
            />
            <Input
              name="newPassword"
              label="New Password"
              register={register}
              errors={errors}
              type="password"
              placeholder="enter the new password "
            />
            <Button className="w-full mt-8">Save changes</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Button
        onClick={() => {
          return (token.value = ""), deleteCookie("token-test");
        }}
        className="flex gap-4 text-[18px]"
      >
        <span>logout</span>
        <IoMdLogOut />
      </Button>
    </div>
  );
}

export default EditProfile;
