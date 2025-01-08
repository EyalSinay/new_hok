import { pasukNachType, pasukTorahType } from "../types/limud.types";
import { startTime } from "../appConfig";
import { getParasha } from "../api/sefaria.api";
import torah from "../data/torah.ts";
import prophets from "../data/prophets.ts";
import writings from "../data/writings.ts";

export async function getDailyTorah(date: Date): Promise<pasukTorahType[]> {
    const parasha = await getParasha(date);

    const firstPasukInParashaIndex = torah.findIndex((pasuk) =>
        pasuk.parasha.includes(parasha)
    );
    let lastPasukInParashaIndex = torah.findIndex(
        (pasuk, index) =>
            index > firstPasukInParashaIndex && !pasuk.parasha.includes(parasha)
    );
    if (lastPasukInParashaIndex === -1) {
        lastPasukInParashaIndex = torah.length;
    }

    const day = date.getDay();
	if (day === 6) {
		return [];
	}

    let firstIndex = [
        firstPasukInParashaIndex,
        firstPasukInParashaIndex + 6,
        firstPasukInParashaIndex + 10,
        firstPasukInParashaIndex + 15,
        firstPasukInParashaIndex + 21,
        firstPasukInParashaIndex,
        0,
    ][day];

    let lastIndex = [
        firstPasukInParashaIndex + 6,
        firstPasukInParashaIndex + 10,
        firstPasukInParashaIndex + 15,
        firstPasukInParashaIndex + 21,
        firstPasukInParashaIndex + 26,
        lastPasukInParashaIndex,
        0,
    ][day];

    const psukim: pasukTorahType[] = [];
    let currentIndex = firstIndex;
    for (let i = firstIndex; i < lastIndex; i++) {
        if (currentIndex >= lastPasukInParashaIndex) {
            currentIndex = firstPasukInParashaIndex;
        }
        let pasuk = torah[currentIndex];
        psukim.push(pasuk);
        currentIndex++;
    }

    return psukim;
}

export function getDailyNach(
    date: Date,
    nachType: "prophets" | "writings"
): pasukNachType[] {
	// TODO: return the haftarah on friday
	
    const nachObject = nachType === "prophets" ? prophets : writings;

    const psukimCountArray = [6, 4, 5, 6, 5, 0, 0];

    let startIndex = 0;
    let currentDate = new Date(startTime);
    while (currentDate <= date) {
        const day = currentDate.getDay();
        const psukimCount = psukimCountArray[day];
        startIndex += psukimCount;
        if (startIndex >= nachObject.length) {
            startIndex = startIndex - nachObject.length;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const psukim: pasukNachType[] = [];
    for (let i = 0; i < psukimCountArray[date.getDay()]; i++) {
        if (startIndex + i >= nachObject.length) {
            startIndex = 0;
        }
        psukim.push(nachObject[startIndex + i]);
    }

    return psukim;
}
