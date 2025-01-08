import useQueryTime from "../hooks/useQueryTime";
import useTorahPsukim from "../hooks/useTorahPsukim";

type Props = {};

export default function Torah({}: Props) {
    const time = useQueryTime();
    const { psukim, loading, error } = useTorahPsukim({ date: time });

    if (!time || loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!psukim) {
        return <div>No psukim</div>;
    }

    return (
        <div>
            Torah<p>{time.toISOString()}</p>
            {psukim.map((pasuk) => (
                <div key={pasuk.perek.toString() + pasuk.pasuk.toString()}>
                    {pasuk.mikra}
                </div>
            ))}
        </div>
    );
}
