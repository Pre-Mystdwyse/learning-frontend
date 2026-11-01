import { Quest } from "../model/types";
import { ApiError } from "@/shared/api";

export async function getQuests(excludeIds: string[]): Promise<Quest[]> {
    const response = await fetch(`http://localhost:3000/api/quests?exclude=${excludeIds.join(',')}`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
            response.status,
            errorData.message,
        );
    }

    return response.json();
}