import { myAxios } from "@/context/myAxios";
import type { loanRecordType } from "@/type";
import { handelerror, useApi } from "@/utils";
import { useMutation } from "@tanstack/react-query";

function useCard() {
  const { handelSuccess } = useApi();
  const createRecordMutation = useMutation({
    mutationFn: (recordInfo: loanRecordType) =>
      myAxios.post("/record/create", recordInfo),
    onSuccess: (res) => {
      return (
        handelSuccess({ res }), handelSuccess({ res, queryKey: "viewCatalog" })
      );
    },
    onError: (err) => handelerror({ err }),
  });

  return { createRecordMutation };
}

export default useCard;
