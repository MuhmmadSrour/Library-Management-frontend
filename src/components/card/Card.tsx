import { UserInfo } from "@/context/signal";
import type { BOOKINFOTYPE } from "@/type";
import { useSignals } from "@preact/signals-react/runtime";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import useCard from "./useCard";

function BookCard({ cover, description, title, _id, status }: BOOKINFOTYPE) {
  useSignals();
  const { createRecordMutation } = useCard();
  return (
    <div>
      <Card
        id={_id}
        className="bg-brown-100   items-center overflow-hidden h-full  gap-1 w-full   py-2   rounded-lg  shadow-xl"
      >
        <CardContent className=" flex flex-col justify-center items-center text-start w-full p-2 gap-2 h-full ">
          <img
            className="w-[150px] h-[150px] object-cover "
            src={cover}
            alt=""
          />
          <h3 className="text-lg font-medium p-4 text-start leading-tight line-clamp-2 w-full overflow-hidden max-h-14">
            {title}
          </h3>
          <p className=" overflow-hidden text-sm  line-clamp-3 p-1 w-full">
            {description}
          </p>

          <Button
            className={`${status == "OVERDUE" ? "bg-red-600" : "bg-brown-500"}`}
            disabled={
              status == "PENDING" || status == "APPROVED" || status == "OVERDUE"
            }
            onClick={() => {
              createRecordMutation.mutate({
                item: _id,
                patron: UserInfo.value?._id,
                status: "PENDING", // أضف الحالة الافتراضية
                requestedDays: 14, // أضف عدد الأيام المطلوبة
              });
            }}
          >
            {status}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default BookCard;
