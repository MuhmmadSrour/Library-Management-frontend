/* eslint-disable @typescript-eslint/no-explicit-any */
import { page } from "@/context/signal";
import { handleData } from "@/utils";
import { useSignals } from "@preact/signals-react/runtime";
import type { UseQueryResult } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useEffect } from "react";
import { Button } from "./ui/button";

function Pagination({
  query,
}: {
  query: UseQueryResult<AxiosResponse<any, any>, Error>;
}) {
  useEffect(() => {
    page.value = 1;
  }, []);
  useSignals();
  return (
    <div className="flex gap-6 justify-center items-center ">
      <Button
        disabled={page.value == 1}
        onClick={() => {
          page.value = page.value - 1;
          query.refetch();
        }}
        className={`bg-brown-500 text-brown-500 hover:text-white hover:bg-brown-500 text-lg${
          page.value == 1 ? "bg-brown-100" : "bg-brown-500 text-white"
        }`}
      >
        {"<"}
      </Button>

      <span>{page.value}</span>
      <span>from</span>
      <span>{handleData(query).pagination.totalPages}</span>
      <Button
        disabled={handleData(query).pagination.totalPages == page.value}
        onClick={() => {
          page.value = page.value + 1;
          query.refetch();
        }}
        className={` text-brown-500 bg-brown-500 hover:text-white hover:bg-brown-500 text-lg${
          page.value == handleData(query).pagination.totalPages
            ? "bg-brown-100"
            : "bg-brown-500 text-white"
        }`}
      >
        {">"}
      </Button>
    </div>
  );
}

export default Pagination;
