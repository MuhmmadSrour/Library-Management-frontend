import { useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteCookie } from "cookies-next";
import { token } from "./context/signal";
import { toast } from "./hooks/use-toast";

export function useApi() {
  const client = useQueryClient();
  function handelSuccess({
    islog = false,
    res,
    queryKey,
  }: {
    islog?: boolean;
    queryKey?: string;
    res: any;
  }) {
    if (queryKey) {
      client.invalidateQueries({ queryKey: [queryKey] });
    }
    if (islog) {
      toast({
        title: "success",
        description: res.data.materials.message,
      });
    }
    return res.data.materials;
  }
  return {
    handelSuccess,
  };
}

export function handelerror({
  islog = true,
  err,
}: {
  islog?: boolean;
  err: any;
}) {
  if (islog)
    if (err?.response?.message) {
      toast({
        title: "error",
        description: err?.response?.message,
      });
    }

  if (err?.response?.status == 403) {
    token.value = "";
    deleteCookie("token-test");
  }
}

export function handleData(
  query: UseQueryResult<AxiosResponse<any, any>, Error>
) {
  return query.data?.data.materials;
}
