import { handleData } from "@/utils";
import { useSignals } from "@preact/signals-react/runtime";
import { useAdmin } from "./useAdmin";

function AdminHome() {
  useSignals();
  const { analysisQuery } = useAdmin();
  if (analysisQuery.data)
    return (
      <div className="flex flex-col   gap-8">
        <h3 className="bg-brown-50 border rounded-lg text-lg w-full h-12 flex items-center p-2 ">
          Dashbord
        </h3>
        <div className="cards  grid  w-full  md:grid-cols-2 gap-8 ">
          <div className="card-1 bg-brown-50 flex flex-col gap-4 p-4 border-t-4 border-brown-500 rounded-lg h-32  ">
            <h3>Available books</h3>
            <span>{handleData(analysisQuery).data.bookNumber}</span>
          </div>
          <div className="card-2 bg-brown-50  flex flex-col gap-4 p-4 border-t-4 border-brown-500 rounded-lg h-32  ">
            <h3>Total employees</h3>
            <span>{handleData(analysisQuery).data.employeeNumber}</span>
          </div>
          <div className="card-3 bg-brown-50  flex flex-col gap-4 p-4 border-t-4 border-brown-500 rounded-lg h-32  ">
            <h3>Active metaphors</h3>
            <span>1</span>
          </div>
          <div className="card-4 bg-brown-50  flex flex-col gap-4 p-4 border-t-4 border-brown-500 rounded-lg h-32  ">
            <h3>Waiting requests</h3>
            <span>1</span>
          </div>
        </div>
        <div className="bg-brown-100  p-4 flex flex-col gap-2 rounded-lg">
          <h3>Latest operations</h3>
          <div className="flex flex-col ">
            <span>تمت إضافة كتاب جديد</span>
            <p className="text-brown-500">بواسطة أحمد محمد - منذ ساعتين</p>
          </div>
          <div className="flex flex-col ">
            <span>تم تسجيل موظف جديد </span>
            <p className="text-brown-500">بواسطة ليلى علي - منذ 4 ساعات</p>
          </div>
          <div className="flex flex-col ">
            <span>تمت معالجة استعارة</span>
            <p className="text-brown-500">بواسطة خالد عبدالله - منذ يوم</p>
          </div>
        </div>
      </div>
    );
}

export default AdminHome;
