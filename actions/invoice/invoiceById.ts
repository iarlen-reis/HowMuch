interface Invoice {
  id: string;
  date: string;
  total: number;
}

interface ItemProps {
  id: string;
  title: string;
  value: number;
  type: string;
  portion: number;
}

interface Purchase {
  date: string;
  items: ItemProps[];
}

interface InvoiceProps {
  data: {
    invoice: Invoice;
    purchases: Purchase[];
  };
}

export async function invoiceById(id: string): Promise<InvoiceProps | null> {
  try {
    const response = await useAPI(`/invoices/${id}`);

    return response.data.value as InvoiceProps;
  } catch (error) {
    console.log(error);
    return null;
  }
}
