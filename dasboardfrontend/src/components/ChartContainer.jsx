export default function ChartContainer({ data, loading, error })
{
    return (
        <div className="content">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            {data && (
                <div>
                    <h2>Data:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}