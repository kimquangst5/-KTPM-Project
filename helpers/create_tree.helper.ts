const create_tree = (array: any, parentId = null) => {
  const new_array = [];
  for (const it of array) {
    if (it.parent_id == parentId) {
      const children = create_tree(array, it.id);
      if (children.length > 0) {
        it.children = children;
      }
      new_array.push(it);
    }
  }
  return new_array;
};

export default (array: any, parentId = null) => {
  const tree = create_tree(array, parentId);
  return tree;
};