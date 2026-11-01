import { ShopItem } from "../model/types";
import { ApiError } from "@/shared/api";

export async function getShopItems(): Promise<ShopItem[]> {
    const response = await fetch('http://localhost:3000/api/shop/items');

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
            response.status,
            errorData.message || "Произошла неизвестная ошибка сервера",
        );
    }

    return response.json();
}