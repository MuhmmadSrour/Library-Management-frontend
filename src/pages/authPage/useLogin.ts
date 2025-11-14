import { myAxios } from "@/context/myAxios";
import { token, UserInfo } from "@/context/signal";
import { handelerror, useApi } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import type { FieldValues } from "react-hook-form";

export function useLogin() {
  const { handelSuccess } = useApi();
  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        return myAxios.post("/auth/login", { email, password });
      } catch (err) {
        handelerror({ err, islog: true });
      }
    },
    onSuccess: (res) => {
      token.value = handelSuccess({ res, islog: true }).data.token;

      UserInfo.value = handelSuccess({ res }).data.user;
    },
    onError: (err) => {
      handelerror({ err, islog: true });
    },
  });
  function sendData(data: FieldValues) {
    const paylod = {
      ...data,
    };
    loginMutation.mutate({
      ...(paylod as { email: string; password: string }),
    });
  }
  return { loginMutation, sendData };
}
