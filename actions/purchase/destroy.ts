export const destroy = async (id: string) => {
  try {
    await useAPI(`/purchase/${id}`, {
      method: "DELETE",
    });

    return navigateTo("/");
  } catch (e) {
    console.error(e);
    return navigateTo("/");
  }
};
