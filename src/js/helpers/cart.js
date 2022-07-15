export const getCart = () => {
    const cart = sessionStorage.getItem("cart");
    if (cart == null) {
        saveCart([]);
        return [];
    }

    return JSON.parse(cart);
};

export const saveCart = (cart) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
    saveCart([]);
};
