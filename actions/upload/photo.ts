export async function photo(file: File) {
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

    return response;
  } catch (error) {
    console.error("Error uploading file", error);
  }
}
