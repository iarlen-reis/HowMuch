import { useAuthStore } from "~/store/useAuthStore";

export async function logout() {
  try {
    const auth = useAuthStore();

    auth.logout();
  } catch (error) {
    console.log(error);
  }
}
