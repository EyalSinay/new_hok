import { pasukTorahType } from "../types/limud.types";
// import { startTime } from "../appConfig";
import { getParasha } from "../api/sefaria.api";
import torah from "../data/torah.ts";
// import prophets from "../data/prophets.ts";
// import writings from "../data/writings.ts";

export async function getDailyTorah(
    date: Date
): Promise<pasukTorahType[] | null> {
    const parasha = await getParasha(date);

    const firstPasukInParashaIndex = torah.findIndex(
        (pasuk) => pasuk.parasha === parasha
    );

    const day = date.getDay();

	console.log('day', day);

    switch (day) {
        case 0:
            return torah.slice(
                firstPasukInParashaIndex,
                firstPasukInParashaIndex + 6
            );
        case 1:
            return torah.slice(
                firstPasukInParashaIndex + 6,
                firstPasukInParashaIndex + 10
            );
        case 2:
            return torah.slice(
                firstPasukInParashaIndex + 10,
                firstPasukInParashaIndex + 15
            );
        case 3:
            return torah.slice(
                firstPasukInParashaIndex + 15,
                firstPasukInParashaIndex + 21
            );
        case 4:
            return torah.slice(
                firstPasukInParashaIndex + 21,
                firstPasukInParashaIndex + 26
            );
        default:
            return null;
    }
}
