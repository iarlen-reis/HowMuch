export default function (type: string): string {
  const types: Record<string, string> = {
    food: "Alimentação",
    laser: "Laser",
    services: "Serviços",
    other: "Outros"
  }

  return types[type]
}