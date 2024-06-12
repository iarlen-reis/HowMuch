interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export async function register(props: RegisterForm) {
  const { $toast } = useNuxtApp();
  const config = useRuntimeConfig();

  try {
    await $fetch(config.public.baseUrl + "/auth/register", {
      method: "post",
      body: props,
    });

    $toast.success("Registro realizado com sucesso!");
    return navigateTo("/login");
  } catch (error) {
    console.log(error);
    $toast.error("Erro ao realizar o registro.");
    return navigateTo("/register");
  }
}
