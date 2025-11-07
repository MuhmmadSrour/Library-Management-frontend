import { myAxios } from "@/context/myAxios";
import { handelerror } from "@/utils";
import { useQuery } from "@tanstack/react-query";

export function useAdmin() {
  const analysisQuery = useQuery({
    queryKey: ["ANALYSIS"],
    queryFn: async () => await myAxios.get("/admin/analysis"),
  });
  if (analysisQuery.isError) {
    handelerror({ err: analysisQuery.error });
  }
  return { analysisQuery };
}
