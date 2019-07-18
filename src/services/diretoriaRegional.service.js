export const getDiretoriaRegional = async () => {
  try {
    const response = await fetch(`http://localhost:3004/dres/`, {
      method: "GET"
    });
    const json = await response.json();
    return json;
  } catch (err) {
    return "erro";
  }
};
