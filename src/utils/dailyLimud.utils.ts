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

    const day = date.getDay();

    let firstIndex;
    let lastIndex;
    if (day === 0) {
        firstIndex = firstPasukInParashaIndex;
        lastIndex = firstIndex + 6;
    } else if (day === 1) {
        firstIndex = firstPasukInParashaIndex + 6;
        lastIndex = firstIndex + 4;
    } else if (day === 2) {
        firstIndex = firstPasukInParashaIndex + 10;
        lastIndex = firstIndex + 5;
    } else if (day === 3) {
        firstIndex = firstPasukInParashaIndex + 15;
        lastIndex = firstIndex + 6;
    } else if (day === 4) {
        firstIndex = firstPasukInParashaIndex + 21;
        lastIndex = firstIndex + 5;
    } else {
        return [];
    }

    const psukim: pasukTorahType[] = [];
    let currentIndex = firstIndex;
    for (let i = firstIndex; i < lastIndex; i++) {
        let pasuk = torah[currentIndex];
        if (!pasuk.parasha.includes(parasha)) {
            currentIndex = firstPasukInParashaIndex;
            pasuk = torah[currentIndex];
        }
        psukim.push(pasuk);
		currentIndex++;
    }

    return psukim;
}

export function getDailyNach(
    date: Date,
    nachType: "prophets" | "writings"
): pasukNachType[] {
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
