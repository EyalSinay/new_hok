import axios from "axios";
import { diaspora, custom, timezone } from "../appConfig";

const baseUrl = "https://www.sefaria.org/api";

export const getParasha = async (date: Date): Promise<string> => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const url = `${baseUrl}/calendars?diaspora=${diaspora}&custom=${custom}&year=${year}&month=${month}&day=${day}&timezone=${timezone}`;
    const response = await axios.get(url);
    return response.data.calendar_items[0].displayValue.he;
};
