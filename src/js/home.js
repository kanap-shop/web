// TODO: add loader

const loadProducts = () =>
    fetch("http://localhost:3000/api/products")
        .then((response) => response.json())
        .then((products) => {
            document.getElementById("items").innerHTML = products
                .map(makeProductCard)
                .join("\n");
        })
        // TODO: display error in UI
        .catch(console.error);

const makeProductCard = (product) => `
    <a href="./product.html?id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>`;

loadProducts();
