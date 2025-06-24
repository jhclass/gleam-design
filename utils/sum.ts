export function sum(a: number, b: number) {
  return a + b;
}
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
