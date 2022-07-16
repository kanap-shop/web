import { $id } from "./helpers/dom";

// TODO: add loader

/**
 * Load all availables products in the UI
 *
 * @returns {Promise<Response>}
 */
const loadProducts = () =>
    fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((products) => {
            $id("items").innerHTML = products.map(makeProductCard).join("\n");
        })
        // TODO: display error in UI
        .catch(console.error);

/**
 * Generate HTML code that represents a product card
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
const makeProductCard = (product) => `
    <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>`;

loadProducts();
