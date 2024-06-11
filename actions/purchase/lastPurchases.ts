interface ItemProps {
  id: string;
  title: string;
  value: number;
  type: string;
}

interface PurchaseProps {
  date: string;
  items: ItemProps[];
}

interface LastPurchaseProps {
  data: {
    total_current_invoice: number;
    total_next_invoices: number;
    last_purchases: PurchaseProps[];
  };
}

export const lastPurchases = async (): Promise<LastPurchaseProps | null> => {
  try {
    const response = await useAPI("/purchase/last-purchases");

    return response.data.value as LastPurchaseProps;
  } catch (error) {
    return null;
  }
};
