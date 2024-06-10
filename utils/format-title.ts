import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function (date: string) {
  const zonedDate = toZonedTime(date, "UTC");
  return format(zonedDate, "MMMM 'de' yyyy", { locale: ptBR });
}
