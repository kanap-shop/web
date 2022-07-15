import { $id } from "./helper";

const loadProduct = () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const productId = searchParams.get("id");

    fetch(`http://localhost:3000/api/products/${productId}`)
        .then((response) => response.json())
        .then((product) => {
            $id("product-image").innerHTML = makeProductImage(product);
            $id("title").title = product.name;
            $id("price").innerText = product.price;
            $id("description").innerText = product.description;
            $id("colors").innerHTML = makeProductColorsSelect(product);

            $id("add-to-cart-button").addEventListener("click", () => {
                const quantity = Number.parseInt($id("quantity").value);
                if (quantity == 0) {
                    return;
                }
                const color = $id("colors").value;

                const cart = null; //getCart();
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

                //saveCart(cart);
            });
        })
        .catch(() => (window.location.href = "index.html"));
};

const makeProductImage = (product) =>
    `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

const makeProductColorsSelect = (product) =>
    product.colors.map((x) => `<option value="${x}">${x}</option>`).join();

loadProduct();
