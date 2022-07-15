import { $id } from "./helpers/dom";
import { getCart, saveCart, clearCart } from "./helpers/cart";
import { noNumeric } from "./helpers/validators";

const loadCart = () => {
    const cart = getCart();

    $id("cart-items").innerHTML = cart
        .map((product, index) => makeCartProduct(product, index))
        .join("");
    updateCartMetadata(cart);
};

const updateCartMetadata = (cart) => {
    $id("total-quantity").innerText = cart.reduce(
        (acc, x) => acc + x.quantity,
        0,
    );

    fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((products) => {
            const prices = Object.assign(
                {},
                ...products.map((x) => ({ [x._id]: x.price })),
            );
            $id("total-price").innerText = cart.reduce(
                (acc, x) => acc + prices[x._id] * x.quantity,
                0,
            );
        })
        .catch(console.error);
};

const makeCartProduct = (product, index) => `
    <article class="cart-item" data-index="${index}" data-id="${product._id}" data-color="${product.color}">
        <div class="cart-item-img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart-item-content">
            <div class="cart-item-content-description">
                <h2>${product.name}</h2>
                <p>${product.color}</p>
                <p>${product.price} €</p>
            </div>
            <div class="cart-item-content-settings">
                <div class="cart-item-content-settings-quantity">
                    <label for="item-quantity">Qté :</label>
                    <input type="number" class="item-quantity" name="item-quantity" min="1" max="100" value="${product.quantity}" onchange="updateCartProduct(event, ${index})">
                </div>
                <div class="cart-item-content-settings-delete">
                    <p class="delete-item" onclick="removeCartProduct(${index})">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;

const removeCartProduct = (index) => {
    const cart = getCart();
    cart.splice(index, 1);

    const element = document.querySelector(`article[data-index="${index}"]`);
    element.remove();

    saveCart(cart);
    updateCartMetadata(cart);
};

const updateCartProduct = (event, index) => {
    const cart = getCart();
    cart[index].quantity = Number.parseInt(event.target.value);

    saveCart(cart);
    updateCartMetadata(cart);
};

const rules = [
    {
        id: "firstName",
        validators: [noNumeric],
    },
    {
        id: "lastName",
        validators: [noNumeric],
    },
    {
        id: "address",
        validators: [],
    },
    {
        id: "city",
        validators: [],
    },
    {
        id: "email",
        validators: [],
    },
];

const placeOrder = (event) => {
    event.preventDefault();

    const data = validateData(event.target);
    const cart = getCart();
    if (!data) {
        return;
    }

    const body = {
        contact: data,
        products: cart.map((x) => x._id),
    };

    const opts = {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    fetch("http://localhost:3000/api/products/order", opts)
        .then((response) => response.json())
        .then((data) => {
            clearCart();
            console.log("ok");
            window.location.href = `./confirmation.html?order-id=${data.orderId}`;
        })
        .catch(console.error);
};

const validateData = (target) => {
    let success = true;
    let values = {};

    for (const rule of rules) {
        const value = target[rule.id].value;
        $id(rule.id + "-error").innerText = "";
        values[rule.id] = value;

        for (const validator of rule.validators) {
            const validatorMessage = validator(value);

            if (validatorMessage != undefined) {
                $id(rule.id + "-error").innerText += `${validatorMessage}\n`;
                success = false;
            }
        }
    }

    return success ? values : null;
};

loadCart();

Object.assign(window, { removeCartProduct, updateCartProduct, placeOrder });
