import { myAxios } from "@/context/myAxios";
import { handelerror, useApi } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useEmployeeHome() {
  const { handelSuccess } = useApi();
  const fetchPendingOrdersQuery = useQuery({
    queryKey: ["PendingLoans"],
    queryFn: async () => {
      return await myAxios.get("/record/employee/pending");
    },
  });
  if (fetchPendingOrdersQuery.isError) {
    handelerror({ err: fetchPendingOrdersQuery.error });
  }
  const approvedRequest = useMutation({
    mutationFn: ({
      loanRecordID,
      employeeID,
      status,
    }: {
      loanRecordID: string;
      employeeID: string;
      status: string;
    }) =>
      myAxios.post("/record/employee/approved", {
        loanRecordID,
        employeeID,
        status,
      }),
    onSuccess: (res) => {
      return (
        handelSuccess({ res }), handelSuccess({ res, queryKey: "PendingLoans" })
      );
    },
    onError: (err) => handelerror({ err }),
  });
  const rejectedRequest = useMutation({
    mutationFn: ({
      loanRecordID,
      employeeID,
      status,
      rejectionReason,
    }: {
      loanRecordID: string;
      employeeID: string;
      status: string;
      rejectionReason: string;
    }) =>
      myAxios.post("/record/employee/rejected", {
        rejectionReason,
        employeeID,
        status,
        loanRecordID,
      }),
    onSuccess: (res) => {
      return handelSuccess({ res, queryKey: "PendingLoans " });
    },
    onError: (err) => handelerror({ err }),
  });

  return { fetchPendingOrdersQuery, approvedRequest, rejectedRequest };
}
