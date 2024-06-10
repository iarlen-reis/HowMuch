import { useAuthStore } from "~/store/useAuthStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  if (!auth.isLoggedIn) {
    try {
      const user = await auth.fetchUser();

      auth.setUser(user);
    } catch (e) {
      console.log(e);
      return navigateTo("/login");
    }
  }
});
