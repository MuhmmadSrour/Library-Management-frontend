/* eslint-disable @typescript-eslint/no-explicit-any */
import { myAxios } from "@/context/myAxios";
import type { REGISTERTYPE } from "@/type";
import { handelerror, useApi } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export type RestData = {
  type: "EMPLOYEE" | "ADMIN" | "PATRON";
};

export function useRegister() {
  const { handelSuccess } = useApi();
  const navigate = useNavigate();
  const [restData, setRestData] = useState<RestData>();
  function handleData({ key, value }: { key: keyof RestData; value: any }) {
    setRestData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  const RegisterMutation = useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      password,
      type,
    }: REGISTERTYPE) => {
      return myAxios.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        type,
      });
    },
    onSuccess: (res) => {
      handelSuccess({ res });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    onError: (err) => handelerror({ err }),
  });

  function sendData(data: FieldValues) {
    const payload: any = {
      ...restData,
      ...data,
    };

    RegisterMutation.mutate({
      ...payload,
    });
  }

  return { RegisterMutation, sendData, handleData, restData, setRestData };
}
