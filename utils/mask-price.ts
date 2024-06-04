export default function (value: string) {
  const cleanedValue = value.replace(/\D/g, "");
  const formattedValue = (Number(cleanedValue) / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedValue;
}
