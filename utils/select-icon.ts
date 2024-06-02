export default function (type: string): string {
  const icons: Record<string, string> = {
    food: "ic:baseline-restaurant",
    laser: "ic:baseline-shopping-bag",
    services: "ic:baseline-house",
    other: "ic:baseline-settings",
  }

  return icons[type]
}