export const convertArrayToCollection = <T>(array: T[], key: keyof T) => (
  array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key] as any]: item,
    };
  }, {})
);

export const addToCollection = <T extends { id: string }>(
  collection: { [id: string]: T }, element: T,
) => {
  return {
    ...collection,
    [element.id]: element,
  };
};

export const deleteFromCollection = <T>(
  collection: { [id: string]: T }, deleteId: string,
) => {
  delete collection[deleteId];

  return collection;
};
