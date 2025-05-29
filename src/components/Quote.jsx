import { useEffect, useState, useCallback } from "react";

export default function Quote() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function getRandomIntInclusive(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    }

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(`https://api.adviceslip.com/advice`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            let fact = await res.json();
            setData(fact.slip.advice);
        } catch (err) {
            setError(err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    return (
        <div className="flex flex-col items-center">
            <div className="m-4 border-2 p-8 w-96 text-center">
                {data}
            </div>
            <button className="pt-4 pb-4 pl-8 pr-8 border-2 w-fit m-4 cursor-pointer rounded-full bg-purple-950 text-white hover:border-purple-300" onClick={fetchData}>New Advice</button>
        </div>
    );
}