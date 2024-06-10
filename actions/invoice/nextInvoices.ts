interface InvoiceProps {
  id: string;
  date: string;
  total: number;
}

interface NextInvoiceProps {
  data: {
    total: number;
    invoices: InvoiceProps[];
  };
}

export const nextInvoices = async (): Promise<NextInvoiceProps | null> => {
  try {
    const response = await useAPI("/invoices/next-invoices");

    return response.data.value as NextInvoiceProps;
  } catch (error) {
    return null;
  }
};
