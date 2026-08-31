import { useBroadcastState } from "./hooks/useBroadcastState";


const ControlPanel = () => {

    const { dataState, updateState } = useBroadcastState();

    const updateHomeScore = (delta: number) => {
        updateState({
            home: {
                ...dataState.home,
                score: dataState.home.score + delta,
            },
        });
    };

    const updateAwayScore = (delta: number) =>
    {
        updateState({
            away: {
                ...dataState.away,
                score: dataState.away.score + delta,
            },
        });
    }

    return (
        <div
            style={{
                width: "100vw",
                minHeight: "100vh",
                background: "#111827",
                color: "#f9fafb",
                padding: "32px",
                boxSizing: "border-box",
                fontFamily: "sans-serif",
            }}
        >
            <h1 style={{ margin: "0 0 24px" }}>
                Broadcast Controller
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    flexDirection: "column",
                    maxWidth: "420px",
                }}
            >

                <label>
                    <div style={{ marginBottom: 8 }}>
                        Home team
                    </div>

                    <input
                        value={dataState.home.name}
                        onChange={(e) =>
                            updateState({
                                home: {
                                    ...dataState.home,
                                    name: e.target.value,
                                },
                            })
                        }
                        style={{
                            width: "100%",
                            padding: "8px 10px",
                        }}
                    />
                </label>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <button
                        onClick={() => updateHomeScore(-1)}
                    >
                        -
                    </button>

                    <span>
                        {dataState.home.score}
                    </span>

                    <button
                        onClick={() => updateHomeScore(1)}
                    >
                        +
                    </button>
                </div>

                <label>
                    <div style={{ marginBottom: 8 }}>
                        Away team
                    </div>

                    <input
                        value={dataState.away.name}
                        onChange={(e) =>
                            updateState({
                                away: {
                                    ...dataState.away,
                                    name: e.target.value,
                                },
                            })
                        }
                        style={{
                            width: "100%",
                            padding: "8px 10px",
                        }}
                    />
                </label>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <button
                        onClick={() => updateAwayScore(-1)}
                    >
                        -
                    </button>

                    <span>
                        {dataState.away.score}
                    </span>

                    <button
                        onClick={() => updateAwayScore(1)}
                    >
                        +
                    </button>
                </div>



            </div>
        </div>
    );
};

export default ControlPanel;