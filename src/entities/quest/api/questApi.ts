import { Quest } from "../model/types";
import { ApiError } from "@/shared/api";

export async function getQuests(excludeIds: string[]): Promise<Quest[]> {
    const baseUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${baseUrl}/api/quests?exclude=${excludeIds.join(',')}`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
            response.status,
            errorData.message,
        );
    }

    return response.json();
}