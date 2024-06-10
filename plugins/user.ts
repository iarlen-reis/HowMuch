interface UserProps {
  id: string;
  name: string;
  email: string;
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const response = await useAPI("/auth/me");

  const user = response.data.value as UserProps;

  return {
    provide: {
      user,
    },
  };
});
