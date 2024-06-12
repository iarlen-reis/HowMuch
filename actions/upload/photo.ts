export async function photo(file: File) {
  const { $toast } = useNuxtApp();
  try {
    const formData = new FormData();
    formData.append("file", file);

    const config = useRuntimeConfig();

    const response = await $fetch(config.public.baseUrl + "/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${useCookie("token").value}`,
      },
    });

    reloadNuxtApp();
    $toast.success("Imagem salva com sucesso!");

    return response;
  } catch (error) {
    $toast.error("Erro ao salvar imagem");
    console.error("Error uploading file", error);
  }
}
