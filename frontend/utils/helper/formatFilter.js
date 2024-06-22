const filterSelectedValues = (tags, types, category) => {
  // Filter tags

  const selectedTags = Object.keys(tags).filter(tag => tags[tag]);

  // Filter types
  const selectedTypes =  Object.keys(types).filter(type => types[type]);

  // Filter categories
  const selectedCategories = Object.keys(category).filter(type => category[type]).reduce((acc, type) => {
    const selectedItems = Object.keys(category[type]).filter(item => category[type][item]);
    if (selectedItems.length > 0) {
      acc.push(...selectedItems);
    }
    return acc;
  }, []);

  return {
    tags: selectedTags,
    types: selectedTypes,
    category: selectedCategories,
  };
};

export default filterSelectedValues;