interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export async function register(props: RegisterForm) {
  try {
    const response = await useAPI("/auth/register", {
      method: "post",
      body: props,
    });

    if (!response.error.value) {
      return navigateTo("/login");
    }
  } catch (error) {
    console.log(error);
    return navigateTo("/register");
  }
}
