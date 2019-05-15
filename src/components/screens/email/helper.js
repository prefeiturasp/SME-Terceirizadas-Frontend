export const generateOptions = optionsArray => {
  let options = [];
  optionsArray.map(option => {
    options.push({ value: option, label: option });
  });
  return options;
};

export const SECURITY_OPTIONS = {
  TLS: "TLS",
  SSL: "SSL"
};
