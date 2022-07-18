export const Conditional = ({ checkRender, children }: any) => {
  return !!checkRender && children;
};
