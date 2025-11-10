/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEmployee } from "@/pages/adminPages/useEmployee";
import { handleData } from "@/utils";
import { useSignals } from "@preact/signals-react/runtime";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import Input from "../Input";
import SelectUi from "../Selectui";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEditEmployee } from "./useEditEmployee";

function EditEmployee({ employeeId }: { employeeId: string }) {
  useSignals();
  const options = [
    { key: "active", value: "true" },
    { key: "unActive", value: "false" },
  ];
  const { getEmployeeQuery } = useEmployee();
  const employees = handleData(getEmployeeQuery).data;
  const employee = employees?.find((emp: any) => emp._id === employeeId);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  useEffect(() => {
    if (employee) {
      reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        type: employee.type,
        isActive: employee.isActive,
      });
    }
  }, [employee, reset]);
  const {
    sendData,
    updateEmployeeData,

    isEditDialogOpen,
    setIsEditDialogOpen,
  } = useEditEmployee(employeeId);
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>
        <FaEdit className="text-blue-400 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>edit employee</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(sendData)}
          className="flex flex-col  gap-4 "
        >
          <Input
            type="text"
            register={register}
            name="firstName"
            placeholder="firstName"
            errors={errors}
          />
          <Input
            type="text"
            register={register}
            name="lastName"
            placeholder="lastName"
            errors={errors}
          />
          <Input
            type="email"
            register={register}
            name="email"
            placeholder="email"
            errors={errors}
          />
          <Input
            type="password"
            register={register}
            name="password"
            placeholder="password"
            errors={errors}
          />
          <Input
            type="text"
            register={register}
            name="type"
            placeholder="type"
            errors={errors}
          />
          <SelectUi
            options={options}
            defaultValue={employee?.isActive == false ? "false" : "true"}
            onChange={(value) => {
              const boolValue = value === "true";
              updateEmployeeData({ key: "isActive", value: boolValue });
              setValue("isActive", boolValue, { shouldValidate: true });
            }}
          />
          <Button type="submit">Edit Employee</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditEmployee;
