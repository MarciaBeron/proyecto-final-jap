const CATEGORIES_URL = "http://localhost:3000/cats/cat.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:3000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments/";
const CART_INFO_URL = "http://localhost:3000/user_cart/";
const CART_BUY_URL = "http://localhost:3000/cart/buy.json";
const LOCALITIES = "http://localhost:3000/localities.json";
const EXT_TYPE = ".json";


let getJSONData = function(url){
  let result = {};
  const token = localStorage.getItem("authToken");  // Obtener el token del localStorage
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',  // Incluir el token en la cabecera si existe
  };

  return fetch(url, {
      method: 'GET',
      headers: headers
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw Error(response.statusText);
      }
  })
  .then(function(response) {
      result.status = 'ok';
      result.data = response;
      return result;
  })
  .catch(function(error) {
      result.status = 'error';
      result.data = error;
      return result;
  });
}
