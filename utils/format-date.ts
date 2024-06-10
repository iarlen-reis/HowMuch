import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

export default function (date: string): string {
  const zonedDate = toZonedTime(date, "UTC");
  return format(zonedDate, "dd 'de' MMM, yyyy", { locale: ptBR });
}
