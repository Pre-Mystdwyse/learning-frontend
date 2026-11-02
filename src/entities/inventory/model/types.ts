import type { ShopItem } from "@/entities/shop";

export interface InventoryInstance {
    id: string,
    shopItemId: string,
}

export interface FullItem extends ShopItem {
    uuid: string,
}