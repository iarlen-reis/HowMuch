export default function (value: number) {
  const formattedValue = (value / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedValue;
}
