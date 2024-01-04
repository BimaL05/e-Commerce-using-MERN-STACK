//function responsible for making the actual API call to fetch products.

export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  //filter = {"category":"smartphone"}
  //sort = {_sort:"price", _order:"desc"}
  //pagination = {_price=1, _limit=10}
  //TODO: multiple category support

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key]; //array which is smartphone, laptops
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1]; //last value of array
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
