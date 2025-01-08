import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function useQueryTime(): Date | null {
    const [searchParams, setSearchParams] = useSearchParams();
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        let timeStr = searchParams.get("time");

        if (!timeStr || isNaN(Date.parse(timeStr))) {
            const now = new Date().toISOString();
            searchParams.set("time", now);
            setSearchParams(searchParams);
            setTime(new Date(now));
        } else {
            setTime(new Date(timeStr));
        }
    }, [searchParams, setSearchParams]);

    return time;
}

export default useQueryTime;
