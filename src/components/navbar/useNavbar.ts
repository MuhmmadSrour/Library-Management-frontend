import { myAxios } from "@/context/myAxios";
import { UserInfo } from "@/context/signal";
import type { PROFILEINFOTYPE } from "@/type";
import { handelerror, useApi } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";

function useNavbar() {
  const { handelSuccess } = useApi();
  const [validProfile, setValidProfile] = useState<boolean>(false);
  const [validSearch, setValidSearch] = useState<boolean>(false);

  const updateProfileMutation = useMutation({
    mutationFn: async (userInfo: PROFILEINFOTYPE) => {
      return myAxios.put("/user/updateProfile", userInfo);
    },
    onSuccess: (res) => {
      const updateUser = handelSuccess({ res });
      UserInfo.value = updateUser;
      setCookie("User-Info", JSON.stringify(updateUser), {
        maxAge: 3600 * 12 * 30 * 24, // صلاحية سنة
      });
      setValidProfile(false);
    },

    onError: (err) => handelerror({ err }),
  });
  function sendData(data: FieldValues) {
    const updateInfo: PROFILEINFOTYPE = {
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      email: data.email as string,
      password: data.oldPassword as string,
      newPassword: data.newPassword as string,
    };
    console.log("send data", updateInfo);

    updateProfileMutation.mutate(updateInfo);
  }

  useEffect(() => {
    console.log(validProfile);
  }, [validProfile]);
  return {
    sendData,
    updateProfileMutation,
    validProfile,
    setValidProfile,
    validSearch,
    setValidSearch,
  };
}

export default useNavbar;
