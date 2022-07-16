import { $id } from "./helpers/dom";
import { getCart, saveCart } from "./helpers/cart";

/**
 * Load the current product in the UI. If its id isn't correct, redirect to the main page
 */
const loadProduct = () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const productId = searchParams.get("id");

    fetch(`http://localhost:3000/api/products/${productId}`)
        .then((response) => response.json())
        .then((product) => {
            document.title = product.name;

            $id("product-image").innerHTML = makeProductImage(product);
            $id("title").innerText = product.name;
            $id("price").innerText = product.price;
            $id("description").innerText = product.description;
            $id("colors").innerHTML = makeProductColorsSelect(product);

            $id("add-to-cart-button").addEventListener("click", () => {
                const quantity = Number.parseInt($id("quantity").value);
                if (quantity == 0) {
                    return;
                }
                const color = $id("colors").value;

                const cart = getCart();
                const productInCart = cart.find(
                    (x) => x._id == product._id && x.color == color,
                );
                if (productInCart) {
                    productInCart.quantity += quantity;
                } else {
                    cart.push({
                        ...product,
                        color: color,
                        quantity: quantity,
                    });
                }

                saveCart(cart);
            });
        })
        .catch(() => (window.location.href = "index.html"));
};

/**
 * Generate HTML code that represent the product's image
 *
 * @param {{
 *     altTxt: string;
 *     colors: string[];
 *     description: string;
 *     imageUrl: string;
 *     name: string;
 *     price: number;
 *     _id: string
 * }} product The product
 * @returns {string} The generated HTML
 */
const makeProductImage = (product) =>
    `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

/**
 * Generate HTML code that represents all product's colors with `<option>`s
 *
 * @param {{
 *     altTxt: string;
 *     colors: string[];
 *     description: string;
 *     imageUrl: string;
 *     name: string;
 *     price: number;
 *     _id: string
 * }} product The product
 * @returns {string} The generated HTML
 */
const makeProductColorsSelect = (product) =>
    product.colors.map((x) => `<option value="${x}">${x}</option>`).join();

loadProduct();
