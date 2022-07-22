export const Conditional = ({ checkRender, children }: any) => {
  return !!checkRender && children;
};

export const enumToArray = (list: any) => {
  return Object.keys(list)
    .filter((v) => isNaN(Number(v)))
    .map((name) => {
      return {
        id: list[name as keyof typeof list],
        value: name,
      };
    });
};
