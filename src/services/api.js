export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function getProductById(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export function getLocalStorage() {
  const storage = localStorage.getItem('productSaveID') !== undefined
    ? JSON.parse(localStorage.getItem('productSaveID'))
    : undefined;
  return storage;
}
