import { defineStore } from "pinia";

interface UserProps {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserProps | null>(null);
  const isLoggedIn = computed(() => !!user.value);

  const config = useRuntimeConfig();

  const fetchUser = async () => {
    const response = await $fetch<UserProps>(
      config.public.baseUrl + "/auth/me",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useCookie("token").value}`,
        },
      }
    );

    return response;
  };

  function setUser(data: UserProps) {
    user.value = data;
  }

  function logout() {
    user.value = null;
    useCookie("token").value = "";

    return navigateTo("/login");
  }

  return {
    user,
    setUser,
    logout,
    isLoggedIn,
    fetchUser,
  };
});
