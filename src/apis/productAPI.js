import productsMobileList from "@/mock/product_mobiles.json";
import productsLaptopList from "@/mock/product_laptops.json";

function fetchMobileProductList() {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(productsMobileList), 500);
  });
}

function fetchLaptopProductList() {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(productsLaptopList), 500);
  });
}

export { fetchMobileProductList, fetchLaptopProductList };
