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
        let number = getRandomIntInclusive(1, 1000);
        try {
            const res = await fetch(`http://numbersapi.com/${number}`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            let fact = await res.text();
            if (fact.includes("is a number for which we're missing a fact")) {
                await fetchData();
                return;
            }
            setData(fact)
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
            <button className="pt-4 pb-4 pl-8 pr-8 border-2 w-fit m-4 cursor-pointer rounded-full bg-purple-950 text-white hover:border-purple-300" onClick={fetchData}>New Fact</button>
        </div>
    );
}