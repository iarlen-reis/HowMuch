export interface ChartProps {
  type: string;
  total_value: number;
}

export async function chartById(id: string): Promise<ChartProps[]> {
  try {
    const response = await useAPI(`/invoices/${id}/chart`);

    return response.data.value as ChartProps[];
  } catch (error) {
    return [];
  }
}
