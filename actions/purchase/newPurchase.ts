interface PurchaseProps {
  title: string;
  value: number;
  date: string;
  type: string;
  description: string;
}

interface ResponseProps {
  purchase: {
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
    const response = await useAPI("/purchase", {
      method: "POST",
      body: props,
    });

    const data = response.data.value as ResponseProps;

    return navigateTo(`/purchase/${data.purchase.id}`);
  } catch (error) {
    return null;
  }
};
