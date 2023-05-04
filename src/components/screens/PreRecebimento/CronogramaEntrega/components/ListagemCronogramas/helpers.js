export const formataNome = nome => {
  return nome.slice(0, 40) + (nome.length > 40 ? "..." : "");
};
