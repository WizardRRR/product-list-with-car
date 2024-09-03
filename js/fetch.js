export async function getDesserts() {
  const response = await fetch("./../data.json");
  const desserts = await response.json();
  return desserts;
}
