interface PurchaseProps {
  data: {
    id: string;
    title: string;
    date: string;
    type: string;
    value: number;
    invoice_id: string;
    description: string;
  };
}

export const purchaseById = async (
  id: string
): Promise<PurchaseProps | null> => {
  try {
    const response = await useAPI(`/purchase/${id}`);

    return response.data.value as PurchaseProps;
  } catch (error) {
    return null;
  }
};
