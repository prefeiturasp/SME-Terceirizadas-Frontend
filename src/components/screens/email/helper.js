export const generateOptions = optionsArray => {
         let options = [];
         optionsArray.map(option => {
           options.push({ value: option, label: option });
         });
         return options;
       };
