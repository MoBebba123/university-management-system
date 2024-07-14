// recursive Function to create a nested category structure

function createExams(exams, parentId) {
  const examList = [];
  let myExams;
  if (parentId == null) {
    myExams = exams.filter((ex) => ex.parentId == undefined);
  } else {
    myExams = exams.filter((ex) => ex.parentId == parentId);
  }

  for (let exam of myExams) {
    examList.push({
      ...exam,
      children: createExams(exams, exam.id),
    });
  }

  return examList;
}

const exams = [
  {
    id: 1,
    title: "",
    children: [{}],
  },
];
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
