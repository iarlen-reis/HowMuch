interface PurchaseProps {
  title: string;
  value: number;
  date: string;
  type: string;
  description: string;
}

interface ResponseProps {
  data: {
    id: string;
    title: string;
    value: number;
    type: string;
    date: string;
    description: string;
    invoice_id: string;
  };
}

export const newPurchase = async (props: PurchaseProps) => {
  try {
    const { $toast } = useNuxtApp();
    const token = useCookie("token").value;
    const config = useRuntimeConfig();

    const response = await $fetch<ResponseProps>(
      config.public.baseUrl + "/purchase",
      {
        method: "POST",
        body: props,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    $toast.success("Compra criada com sucesso!");
    return navigateTo(`/purchase/${response.data.id}`);
  } catch (error) {
    return null;
  }
};
