import React from "react";
import { pasukTorahType } from "../types/limud.types";
import { getDailyTorah } from "../utils/dailyLimud.utils";

type Props = { date: Date | null };

export default function useTorahPsukim({ date }: Props) {
    const [psukim, setPsukim] = React.useState<pasukTorahType[] | null>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!date) {
            return;
        }
        getDailyTorah(date)
            .then((psukim) => setPsukim(psukim))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [psukim, date]);

    return { psukim, loading, error };
}
