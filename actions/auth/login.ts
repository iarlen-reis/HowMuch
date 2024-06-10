interface LoginForm {
  email: string;
  password: string;
}

interface ResponseProps {
  token: string;
  expires_in: number;
}

export async function login(form: LoginForm) {
  try {
    const response = await useAPI("/auth/login", {
      method: "post",
      body: form,
    });

    const data = response.data.value as ResponseProps;

    if (data.token) {
      const token = useCookie("token", {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 1), // 1 day
      });

      token.value = data.token;
      return navigateTo("/");
    }
  } catch (error) {
    console.log(error);
    return navigateTo("/login");
  }
}
