const getJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

const data = getJSON("https://dummyjson.com/products");

var default_products = [];

data.then((responseData) => {
  var i = 1;
  for (const product of responseData.products) {
    const title = product.title;
    const description = product.description;
    const thumbnailLink = product.thumbnail;

    const product_list = document.getElementById("product-list");
    const text = document.createTextNode(title + ", " + description);
    const list_item = document.createElement("li");
    const img = document.createElement("img");
    list_item.id = i;
    img.src = thumbnailLink;

    list_item.appendChild(text);
    list_item.appendChild(img);
    product_list.appendChild(list_item);
    i++;
  }
  default_products = Array.from(
    document.getElementById("product-list").children
  );
});

function filter(input_text) {
  var container = document.getElementById("product-list");
  const products = Array.from(container.children);
  products.forEach((element) => {
    element.classList.remove("hidden");
    if (!element.innerText.toLowerCase().includes(input_text.toLowerCase())) {
      element.classList.add("hidden");
    }
  });
}

function sortAsc(a, b) {
  if (a.innerText.toUpperCase() > b.innerText.toUpperCase()) return 1;
  if (a.innerText.toUpperCase() < b.innerText.toUpperCase()) return -1;
  return 0;
}

function sortDesc(a, b) {
  if (a.innerText.toUpperCase() < b.innerText.toUpperCase()) return 1;
  if (a.innerText.toUpperCase() > b.innerText.toUpperCase()) return -1;
  return 0;
}

function sortDefault(a, b) {
  if (a.id > b.id) return 1;
  if (a.id < b.id) return -1;
  return 0;
}

function sort_products(sort_type) {
  var container = document.getElementById("product-list");
  var products = Array.from(container.children);
  container.innerHTML = "";
  console.log(sort_type);
  if (sort_type == "asc") products.sort(sortAsc);
  if (sort_type == "desc") products.sort(sortDesc);
  if (sort_type == "default") products = default_products;
  products.forEach((element) => {
    container.append(element);
  });
}
