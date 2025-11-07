import { UserInfo } from "./../../context/signal";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { myAxios } from "@/context/myAxios";
import { handelerror, useApi } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
export function useHomePage() {
  const { handelSuccess } = useApi();
  const getLibraryCardQuery = useQuery({
    queryKey: ["cardNumber", UserInfo.value?.libraryCard?.cardNumber],
    queryFn: async () => {
      return await myAxios.get(
        `/card/${UserInfo.value?.libraryCard?.cardNumber}`
      );
    },
    enabled: !!UserInfo.value?.libraryCard?.cardNumber,
  });
  if (getLibraryCardQuery.isError) {
    handelerror({ err: getLibraryCardQuery.error });
  }
  const checkRecordMutation = useMutation({
    mutationFn: async () => {
      try {
        return myAxios.patch("/record/checkRecord");
      } catch (err) {
        handelerror({ err });
      }
    },
    onSuccess: (res) => handelSuccess({ res }),
    onError: (err) => handelerror({ err }),
  });
  return { getLibraryCardQuery, checkRecordMutation };
}
