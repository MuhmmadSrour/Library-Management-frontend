import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { BorrowRequestType } from "@/type";
import { handleData } from "@/utils";
import { useForm } from "react-hook-form";
import { useEmployeeHome } from "./useEmployeeHome";

function EmployeeHome() {
  const { fetchPendingOrdersQuery, approvedRequest, rejectedRequest } =
    useEmployeeHome();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  if (fetchPendingOrdersQuery.isLoading) return <>...loadind</>;
  if (fetchPendingOrdersQuery.data)
    return (
      <div className="flex flex-col gap-8">
        <h3 className="text-lg font-medium">New loan requests:</h3>
        {handleData(fetchPendingOrdersQuery).data.map(
          (request: BorrowRequestType) => (
            <div
              key={request._id}
              className="card-loan border-l-4 border-l-brown-500 border rounded-lg p-4 flex flex-col bg-brown-50"
            >
              <h3 className="font-medium text-black">{request.item?.title}</h3>
              <span className="text-black tracking-wider">
                Request from:
                <span className="text-gray-400">
                  {request.patron?.firstName}
                  {request.patron?.lastName}{" "}
                </span>
              </span>
              <span className="text-black tracking-wider">
                Order date:
                <span className="text-gray-400">{request.createdAt}</span>
              </span>

              <span className="text-black tracking-wider">
                Required loan period:
                <span className="text-gray-400 ">{request.requestedDays}</span>
              </span>
              <div className="flex gap-4  mt-2">
                <Button
                  onClick={() =>
                    approvedRequest.mutate({
                      loanRecordID: request._id!,
                      employeeID: request.employeeOut!,
                      status: "APPROVED",
                    })
                  }
                >
                  acceptance
                </Button>
                <Dialog>
                  <DialogTrigger className="bg-brown-500 text-primary-foreground shadow hover:bg-brown-500 inline-flex items-center justify-center hover:scale-95  gap-2  px-4 py-2 rounded-md text-sm font-medium">
                    reject
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Borrowing request rejected</DialogTitle>
                    <form
                      onSubmit={handleSubmit((data) => {
                        rejectedRequest.mutate({
                          employeeID: request.employeeOut!,
                          loanRecordID: request._id!,
                          status: "REJECTED",
                          rejectionReason: data.rejectionReason,
                        });
                      })}
                    >
                      <DialogDescription>
                        <Input
                          name="rejectionReason"
                          register={register}
                          errors={errors}
                          defaultValue="reason the rejected"
                        />
                      </DialogDescription>
                      <DialogFooter className="flex">
                        <Button type="submit">Confirm rejection</Button>
                        <Button type="button">cancel</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )
        )}
      </div>
    );
}

export default EmployeeHome;
