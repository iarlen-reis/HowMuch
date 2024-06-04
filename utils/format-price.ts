export default function (value: number) {
  if (value >= 10000 && value < 1000000) {
    return value / 1000 + "K";
  }

  if (value >= 1000000) {
    return value / 1000000 + "M";
  }

  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
