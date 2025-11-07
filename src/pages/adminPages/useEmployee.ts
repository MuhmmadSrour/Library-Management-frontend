import { myAxios } from "@/context/myAxios";
import { handelerror, useApi } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { FieldValues } from "react-hook-form";

export function useEmployee() {
  const { handelSuccess } = useApi();
  const getEmployeeQuery = useQuery({
    queryKey: ["Employees"],
    queryFn: async () => await myAxios.get("/employee/list"),
  });

  if (getEmployeeQuery.isError) {
    handelerror({ err: getEmployeeQuery.error });
  }

  const deleteEmployeeMutation = useMutation({
    mutationFn: (employeeId: string) =>
      myAxios.delete(`/employee/${employeeId}`),
    onSuccess: (res) => handelSuccess({ res, queryKey: "Employees" }),
    onError: (err) => {
      handelerror({ err });
    },
  });
  const addEmployeeMutation = useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
      type,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      type: string;
    }) => {
      return await myAxios.post("/employee/create", {
        firstName,
        lastName,
        email,
        password,
        type,
      });
    },
    onSuccess: (res) => {
      handelSuccess({ res, queryKey: "Employees" });
    },
    onError: (err) => {
      handelerror({ err });
    },
  });
  function addEmployee(data: FieldValues) {
    addEmployeeMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      type: data.type,
    });
  }
  return {
    getEmployeeQuery,
    deleteEmployeeMutation,
    addEmployee,
    handelSuccess,
  };
}
