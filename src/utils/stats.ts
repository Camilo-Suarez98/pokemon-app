export const lowAndHighStats = (quantity: number): string => {
  if (quantity < 50) {
    return "text-red-500";
  } else if (quantity > 70) {
    return "text-green-500";
  } else {
    return "text-black";
  }
};
