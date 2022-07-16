import { $id } from "./helpers/dom";

const loadOrderId = () => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const orderId = searchParams.get("order-id");

    if (orderId === null) {
        window.location.href = "index.html";
        return;
    }

    $id("order-id").innerText = orderId;
};

loadOrderId();
