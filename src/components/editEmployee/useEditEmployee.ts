/* eslint-disable @typescript-eslint/no-explicit-any */
import { myAxios } from "@/context/myAxios";
import type { USERINFOTYPE } from "@/type";
import { handelerror, useApi } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";

type statusEmployee = {
  isActive: boolean;
};
export function useEditEmployee(employeeId: string) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [restData, setRestData] = useState<statusEmployee>();
  function updateEmployeeData({
    key,
    value,
  }: {
    key: keyof statusEmployee;
    value: boolean;
  }) {
    setRestData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }
  const { handelSuccess } = useApi();

  const editEmployee = useMutation({
    mutationFn: (emp: USERINFOTYPE) =>
      myAxios.put(`/employee/update/${employeeId}`, emp),
    onSuccess: (res) => handelSuccess({ queryKey: " Employees", res }),
    onError: (err) => handelerror({ err }),
  });
  function sendData(data: FieldValues) {
    const payload: any = {
      ...restData,
      ...data,
    };
    // لا ترسل كلمة المرور إذا كانت فارغة
    if (!payload.password) {
      delete payload.password;
    }

    editEmployee.mutate({ ...payload });
    setIsEditDialogOpen(false);
  }

  return {
    updateEmployeeData,
    sendData,
    restData,
    isEditDialogOpen,
    setIsEditDialogOpen,
  };
}
