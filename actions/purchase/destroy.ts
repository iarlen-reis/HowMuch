export const destroy = async (id: string) => {
  try {
    const { $toast } = useNuxtApp();
    const token = useCookie("token").value;

    const config = useRuntimeConfig();

    await $fetch(config.public.baseUrl + `/purchase/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    $toast.success("Compra removida com sucesso!");
    return navigateTo("/");
  } catch (e) {
    console.error(e);
    return navigateTo("/");
  }
};
