export const newObject = (oldObject, newProps) => {
  return {
    ...oldObject,
    ...newProps,
  };
};
