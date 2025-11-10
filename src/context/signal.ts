import type {
  BOOKINFOTYPE,
  BorrowRequestType,
  SearchParamsType,
  USERINFOTYPE,
} from "@/type";
import { effect, signal } from "@preact/signals-react";
import { getCookie, setCookie } from "cookies-next";
import { myAxios } from "./myAxios";
export const token = signal(getCookie("token-test")?.toString() ?? "");
export const UserInfo = signal<USERINFOTYPE | undefined>(
  getCookie("User-Info")
    ? JSON.parse(getCookie("User-Info") as string)
    : undefined
);
export const OrderStatus = signal<string>("available");
export const BorrowRequest = signal<BorrowRequestType>();
export const EmployeeInfo = signal<USERINFOTYPE[]>([]);
export const BookInfo = signal<BOOKINFOTYPE | undefined>();
export const filterBook = signal<SearchParamsType>({});
export const page = signal<number>(1);
export const limit = signal<number>(25);
effect(() => {
  if (token.value) {
    setCookie("token-test", token.value);
    myAxios.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = "Bearer " + token.value;
        // config.headers['Content-Type'] = 'application/json';
        return config;
      },
      (error) => {
        console.log(error);

        Promise.reject(error);
      }
    );
  }
});
effect(() => {
  if (UserInfo.value) {
    setCookie("User-Info", UserInfo.value);
  }
});
