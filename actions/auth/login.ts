interface LoginForm {
  email: string;
  password: string;
}

interface ResponseProps {
  token: string;
  expires_in: number;
}

export async function login(form: LoginForm) {
  const { $toast } = useNuxtApp();
  const config = useRuntimeConfig();

  try {
    const response = await $fetch<ResponseProps>(
      config.public.baseUrl + "/auth/login",
      {
        method: "post",
        body: form,
      }
    );

    if (response.token) {
      const token = useCookie("token", {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 1), // 1 day
      });

      token.value = response.token;

      $toast.success("Login realizado com sucesso!");
      return navigateTo("/");
    }
  } catch (error) {
    console.log(error);
    $toast.error("Credenciais inválidas.");
    return navigateTo("/login");
  }
}
