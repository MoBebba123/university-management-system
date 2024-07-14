// recursive Function to create a nested  structure

function createExams(exams, parentId) {
  const examList = [];
  let exam;
  if (parentId == null) {
    exam = exams.filter((ex) => ex.parentId == undefined);
  } else {
    exam = exams.filter((ex) => ex.parentId == parentId);
  }

  for (let ex of exam) {
    examList.push({
      ...ex,
      children: createExams(exams, ex.id),
    });
  }

  return examList;
}

function findCategoryWithId(categoriesWithProductsList, categoryId) {
  // Helper function to recursively search for a category
  function findCategoryRecursive(category, id) {
    if (category.id === id) {
      return category;
    }

    for (const childCategory of category.children) {
      const foundCategory = findCategoryRecursive(childCategory, id);
      if (foundCategory) {
        return foundCategory;
      }
    }

    return null;
  }

  // Search for the category in the list
  for (const category of categoriesWithProductsList) {
    const foundCategory = findCategoryRecursive(category, categoryId);
    if (foundCategory) {
      return foundCategory;
    }
  }

  // Return null if the category with the given ID is not found
  return null;
}

function getImageIdsForCategory(data) {
  const imageIds = [];

  function extractImageIds(category) {
    // Extract the image_public_id of the category itself
    if (category.image_public_id) {
      imageIds.push(category.image_public_id);
    }

    // Extract public_id of products in the category
    for (const product of category.products) {
      if (product.images) {
        for (const image of product.images) {
          if (image.public_id) {
            imageIds.push(image.public_id);
          }
        }
      }
    }

    for (const childCategory of category.children) {
      extractImageIds(childCategory);
    }
  }

  extractImageIds(data);

  return imageIds;
}

export { createExams, getImageIdsForCategory, findCategoryWithId };
