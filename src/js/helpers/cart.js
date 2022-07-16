/**
 * Get the current session's cart
 *
 * @returns {{
 *     colors: string[];
 *     _id: string;
 *     name: string;
 *     price: number;
 *     imageUrl: string;
 *     description: string;
 *     altTxt: string;
 *     color: string;
 *     quantity: number;
 * }[]} Array of items in cart
 */
export const getCart = () => {
    const cart = sessionStorage.getItem("cart");
    if (cart == null) {
        saveCart([]);
        return [];
    }

    return JSON.parse(cart);
};

/**
 * Save new cart to the session storage
 *
 * @param {{
 *     colors: string[];
 *     _id: string;
 *     name: string;
 *     price: number;
 *     imageUrl: string;
 *     description: string;
 *     altTxt: string;
 *     color: string;
 *     quantity: number;
 * }[]} cart The new cart
 */
export const saveCart = (cart) => {
    cart = cart.sort((a, b) => a.name.localeCompare(b.name));
    sessionStorage.setItem("cart", JSON.stringify(cart));
};

/**
 * Clear the current session's cart
 */
export const clearCart = () => {
    saveCart([]);
};
