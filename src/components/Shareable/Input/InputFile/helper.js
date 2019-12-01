export async function readerFile(file) {
  let result_file = await new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split("base64,")[1];
      return resolve({
        arquivo: `data:${file.type};base64,${base64}`,
        nome: file.name
      });
    };
    reader.readAsDataURL(file);
  });
  return result_file;
}
