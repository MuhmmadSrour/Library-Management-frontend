/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineDelete } from "react-icons/ai";

import EditEmployee from "@/components/editEmployee/EditEmployee";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { USERINFOTYPE } from "@/type";
import { handleData } from "@/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
import { useEmployee } from "./useEmployee";
function Employees() {
  const { getEmployeeQuery, deleteEmployeeMutation, addEmployee } =
    useEmployee();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "all" });
  const handleAddEmployee = async (data: any) => {
    await addEmployee(data);

    setIsAddDialogOpen(false);
    reset(); // إعادة تعيين النموذج بعد الإرسال
  };

  if (getEmployeeQuery.isLoading) return <>..loading</>;
  if (getEmployeeQuery.data)
    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-medium">Staff management</h3>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                Add a new employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>add new employee</DialogTitle>
              <form
                onSubmit={handleSubmit(handleAddEmployee)}
                className="flex flex-col  gap-4 p-2"
              >
                <Input
                  type="text"
                  register={register}
                  name="firstName"
                  placeholder="firstName"
                  errors={errors}
                  validationOptions={{ required: "firstName is required" }}
                />
                <Input
                  type="text"
                  register={register}
                  name="lastName"
                  placeholder="lastName"
                  errors={errors}
                  validationOptions={{ required: "lastName is required" }}
                />
                <Input
                  type="email"
                  register={register}
                  name="email"
                  placeholder="email"
                  errors={errors}
                  validationOptions={{ required: "email is required" }}
                />
                <Input
                  type="password"
                  register={register}
                  name="password"
                  placeholder="password"
                  errors={errors}
                  validationOptions={{ required: "password is required" }}
                />
                <Input
                  type="text"
                  register={register}
                  name="type"
                  placeholder="type"
                  errors={errors}
                  validationOptions={{ required: "type is required" }}
                />
                <Button type="submit">Add Employee</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <form className="relative">
          <Input
            className="border-brown-500"
            name="employee"
            register={register}
            errors={errors}
            placeholder="Search for an employee"
            type="text"
          />
          <AiOutlineSearch className="absolute top-3 right-3 text-xl  " />
        </form>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>firstName</TableHead>
              <TableHead>lastName</TableHead>
              <TableHead>email</TableHead>
              <TableHead>type</TableHead>
              <TableHead>state</TableHead>
              <TableHead>procedures</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {handleData(getEmployeeQuery).data.map((employee: USERINFOTYPE) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.type}</TableCell>
                <TableCell
                  className={`${
                    employee.isActive == true
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {employee.isActive == true ? "Active" : "Inactive"}
                </TableCell>
                <TableCell className="flex gap-6 items-center text-lg">
                  <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <AiOutlineDelete className="text-red-400 cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>delete employee</DialogTitle>
                        <DialogDescription>
                          Are you suer you want delete
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            deleteEmployeeMutation.mutate(employee._id!);
                            setIsDeleteDialogOpen(false);
                          }}
                        >
                          delete
                        </Button>
                        <Button onClick={() => setIsDeleteDialogOpen(false)}>
                          close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <EditEmployee employeeId={employee._id!} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
}

export default Employees;
