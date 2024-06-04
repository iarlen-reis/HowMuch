import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function (date: string): string {
  const dateString = new Date(date);
  return format(dateString, "dd 'de' MMM, yyyy", { locale: ptBR });
}
