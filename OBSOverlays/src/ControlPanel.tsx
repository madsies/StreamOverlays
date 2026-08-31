import { Box, Button, Card, CardContent, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useBroadcastState } from "./hooks/useBroadcastState";
import { ow2Heroes, ow2Maps } from "./utils/heroes";
import { useEffect, useState } from "react";
import type { MapResult } from "./components/scoreboard";

type TeamControlsProps = {
    team: "home" | "away";
    label: string;
    dataState: any;
    updateState: (state: any) => void;
    completeMap: (winner: "home" | "away") => void;
    undoMap: (winner: "home" | "away") => void;
};

const TeamControls = ({ team, label, dataState, updateState, completeMap, undoMap }: TeamControlsProps) => {
    const data = dataState[team];

    const update = (changes: any) =>
        updateState({
            [team]: {
                ...data,
                ...changes,
            },
        });

    const updateScore = (delta: number) => {
        if (delta > 0) {
            completeMap(team);
        } else {
            undoMap(team);
        }
    };

    const [colour, setColour] = useState(data.colour);

    useEffect(() => {
        setColour(data.colour);
    }, [data.colour]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (colour !== data.colour) {
                update({ colour });
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [colour]);

    return (
        <Card
            sx={{
                background: "#3aafa9",
                color: "white",
                borderTop: `4px solid ${data.colour}`,
            }}
        >
            <CardContent>
                <Typography variant="h5" fontWeight={700} mb={3}>
                    {label}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <TextField label="Match Title" value={data.name} onChange={(e) => update({ name: e.target.value })} fullWidth />

                        <Box mx={1}>
                            <Typography variant="body2" ml={0.5}>
                                Team colour
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
                                <input
                                    type="color"
                                    value={colour}
                                    onChange={(e) => setColour(e.target.value)}
                                    style={{
                                        width: 60,
                                        height: 40,
                                        padding: 2,
                                        cursor: "pointer",
                                        background: "transparent",
                                        border: "none",
                                    }}
                                />

                                <Typography>{data.colour}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="body2" mb={1}>
                            Team PFP
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {data.teamLogoPath && (
                                <Box
                                    component="img"
                                    src={data.teamLogoPath}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        objectFit: "cover",
                                        borderRadius: 1,
                                    }}
                                />
                            )}

                            <Button variant="outlined" component="label">
                                {data.teamLogoPath ? "Change PFP" : "Upload PFP"}

                                <input
                                    type="file"
                                    hidden
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        const reader = new FileReader();

                                        reader.onload = () => {
                                            update({
                                                teamLogoPath: reader.result as string,
                                            });
                                        };

                                        reader.readAsDataURL(file);
                                    }}
                                />
                            </Button>

                            {data.teamLogoPath && (
                                <Button color="error" onClick={() => update({ teamLogoPath: "" })}>
                                    Remove
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap:1,
                        }}
                    >
                        <Box
                            sx={{
                                border: 1,
                                borderColor: "darkgrey",
                                p: 1,
                                borderRadius: 1,
                                minWidth: "225px",
                            }}
                        >
                            <Typography variant="body2" mb={1}>
                                Score
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Button variant="contained" onClick={() => updateScore(-1)}>
                                    -
                                </Button>

                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    sx={{
                                        minWidth: 50,
                                        textAlign: "center",
                                    }}
                                >
                                    {data.score}
                                </Typography>

                                <Button variant="contained" onClick={() => updateScore(1)}>
                                    +
                                </Button>
                            </Box>
                        </Box>

                    <FormControl fullWidth>
                        <InputLabel>Banned hero</InputLabel>

                        <Select
                            value={data.ban ?? ""}
                            label="Banned hero"
                            onChange={(e) =>
                                update({
                                    ban: e.target.value || null,
                                })
                            }
                        >
                            <MenuItem value="">No ban</MenuItem>

                            {ow2Heroes.map((hero) => (
                                <MenuItem key={hero} value={hero}>
                                    {hero}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                        <Box
                            sx={{
                                border: 1,
                                borderColor: "darkgrey",
                                p: 1,
                                borderRadius: 1,
                                minWidth: "60px",
                                justifyItems: "center",
                            }}
                        >
                            <Typography variant="body2" mb={1}>
                                Listen In?
                            </Typography>

                            <Box sx={{ display: "flex", justifyItems: "center", gap: 2 }}>
                                <Checkbox
                                    checked={data.listenIn}
                                    onChange={(e) =>
                                        update({
                                            listenIn: e.target.checked,
                                        })
                                    }
                                />
                            </Box>
                        </Box>
                    </Box>


                </Box>
            </CardContent>
        </Card>
    );
};

const ControlPanel = () => {
    const { dataState, updateState } = useBroadcastState();

    const getMapCount = (type: string) => {
        switch (type) {
            case "Bo1":
                return 1;
            case "Bo3":
                return 3;
            case "Bo5":
                return 5;
            case "Bo7":
                return 7;
            default:
                return 1;
        }
    };

    const maps: (MapResult | null)[] = dataState.maps ?? [];

    const completedMaps = maps.filter((map) => map?.winner).length;

    const currentMap = maps.findIndex((map) => map && !map.winner);

    const currentMapIndex = currentMap !== -1 ? currentMap : maps.findIndex((map) => map == null);

    const completeMap = (winner: "home" | "away") => {
        const maxMaps = getMapCount(dataState.type);

        if (completedMaps >= maxMaps) return;
        

        const mapIndex = currentMapIndex;

        if (mapIndex === -1) return;
        
        const current = maps[mapIndex];

        if (!current || current.winner)  return;

        const updatedMaps = [...maps];

        updatedMaps[mapIndex] = {
            ...current,
            winner,
            homeBan: dataState.home.ban ?? null,
            awayBan: dataState.away.ban ?? null,
        };

        updateState({
            home: {
                ...dataState.home,
                score: winner === "home" ? dataState.home.score + 1 : dataState.home.score,
                ban: null,
            },

            away: {
                ...dataState.away,
                score: winner === "away" ? dataState.away.score + 1 : dataState.away.score,
                ban: null,
            },

            maps: updatedMaps,
        });
    };

    const undoMap = (winner: "home" | "away") => {
        let lastCompletedIndex = -1;

        for (let i = maps.length - 1; i >= 0; i--) {
            if (maps[i]?.winner) {
                lastCompletedIndex = i;
                break;
            }
        }

        if (lastCompletedIndex === -1) {
            return;
        }

        const lastMap = maps[lastCompletedIndex];

        if (!lastMap || lastMap.winner !== winner) {
            return;
        }

        const updatedMaps = [...maps];

        updatedMaps[lastCompletedIndex] = {
            map: lastMap.map,
            winner: null,
            homeBan: null,
            awayBan: null,
        };

        updateState({
            home: {
                ...dataState.home,
                score: winner === "home" ? Math.max(0, dataState.home.score - 1) : dataState.home.score,
                ban: lastMap.homeBan ?? null,
            },

            away: {
                ...dataState.away,
                score: winner === "away" ? Math.max(0, dataState.away.score - 1) : dataState.away.score,
                ban: lastMap.awayBan ?? null,
            },

            maps: updatedMaps,
        });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                maxWidth: "100vw",
                boxSizing: "border-box",
                background: "#def2f1",
                color: "#262b31",
                p: 4,
            }}
        >
            <Typography variant="h4" fontWeight={700} mb={4}>
                Broadcast Controller
            </Typography>

            <Card sx={{mb: 3,maxWidth: "100vw",background: "#2b7a78",color: "white",}}>
                <CardContent>
                    <Typography variant="h5" fontWeight={700} mb={3}>
                        Match Settings
                    </Typography>

                    <TextField
                        label="Match Title"
                        value={dataState.title}
                        sx={{ px: 1, width: "fit-content" }}
                        onChange={(e) =>
                            updateState({
                                title: e.target.value,
                            })
                        }
                    />

                    <FormControl sx={{ minWidth: 220 }}>
                        <InputLabel>Match format</InputLabel>

                        <Select
                            value={dataState.type}
                            label="Match format"
                            onChange={(e) =>
                                updateState({
                                    type: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="Bo1">Best of 1</MenuItem>
                            <MenuItem value="Bo3">Best of 3</MenuItem>
                            <MenuItem value="Bo5">Best of 5</MenuItem>
                            <MenuItem value="Bo7">Best of 7</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="outlined"
                        onClick={() => {
                                const swappedMaps: (MapResult | null)[] = dataState.maps.map(
                                    (map: MapResult | null) => {
                                        if (!map) return null;

                                        let winner: "home" | "away" | null = null;

                                        if (map.winner === "home") {
                                            winner = "away";
                                        } else if (map.winner === "away") {
                                            winner = "home";
                                        }

                                        return {
                                            ...map,
                                            winner,
                                            homeBan: map.awayBan ?? null,
                                            awayBan: map.homeBan ?? null,
                                        };
                                    }
                                );
                            updateState({
                                home: dataState.away,
                                away: dataState.home,
                                maps: swappedMaps,
                            });
                        }}
                        sx={{ padding: 1.5, mx: 2, height: 56 }}
                    >
                        Swap Sides
                    </Button>
                </CardContent>
            </Card>

            {/* Maps */}
            <Card
                sx={{
                    mb: 3,
                    background: "#2b7a78",
                    color: "white",
                }}
            >
                <CardContent>
                    <Typography variant="h5" fontWeight={700} mb={3}>
                        Maps
                    </Typography>

                    <Box
                        sx={{display: "flex",gap: 2,flexWrap: "wrap",}}
                    >
                        {Array.from({
                            length: getMapCount(dataState.type),
                        }).map((_, index) => {
                            const mapData = maps[index];
                            const mapId = mapData?.map ?? null;
                            const isCurrentMap = index === currentMapIndex && !mapData?.winner;

                            const isCompleted = !!mapData?.winner;

                            return (
                                <Box key={index} sx={{ minWidth: 180,flex: 1,display: "flex",flexDirection: "column",}}>
                                    <FormControl sx={{width: "100%",
                                            "& .MuiOutlinedInput-root": {
                                                border: isCurrentMap ? "2px solid #dddddd" : undefined,
                                                boxShadow: isCurrentMap ? "0 0 -10px rgba(255,255,255,0.5)" : undefined,
                                            },
                                        }}
                                    >
                                        <InputLabel sx={{fontWeight: isCurrentMap ? 800 : "inherit", opacity: isCurrentMap ? 1.0 : "inherit" }}>{isCurrentMap ? `Map ${index + 1} — CURRENT` : `Map ${index + 1}`}</InputLabel>

                                        <Select
                                            value={mapId ?? ""}
                                            label={isCurrentMap ? `Map ${index + 1} — CURRENT` : `Map ${index + 1}`}
                                            onChange={e => {
                                                const value = e.target.value;
                                                const updatedMaps = [...maps];

                                                if (value === 0) {
                                                    updatedMaps[index] = null;
                                                } else {
                                                    updatedMaps[index] = {
                                                        map: Number(value),
                                                        winner: null,
                                                        homeBan: null,
                                                        awayBan: null,
                                                    };
                                                }

                                                const homeScore = updatedMaps.filter(
                                                    map => map?.winner === "home"
                                                ).length;

                                                const awayScore = updatedMaps.filter(
                                                    map => map?.winner === "away"
                                                ).length;

                                                updateState({
                                                    maps: updatedMaps,
                                                    home: {
                                                        ...dataState.home,
                                                        score: homeScore,
                                                    },
                                                    away: {
                                                        ...dataState.away,
                                                        score: awayScore,
                                                    },
                                                });
                                            }}
                                        >
                                            {Object.entries(ow2Maps).map(([id, map]) => (
                                                <MenuItem key={id} value={Number(id)}>
                                                    {map.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {isCompleted && mapData && (
                                        <Box sx={{ mt: 1, textAlign:"center" }}>
                                            <Typography variant="body2" fontWeight={700}>
                                                Winner: {dataState[mapData.winner!].name}
                                            </Typography>

                                            <Typography variant="caption">
                                                {dataState.home.name}: {mapData.homeBan ?? "No ban"}
                                            </Typography>

                                            <Typography variant="caption" display="block">
                                                {dataState.away.name}: {mapData.awayBan ?? "No ban"}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                </CardContent>
            </Card>

            {/* Teams */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                    },
                    gap: 3,
                }}
            >
                <TeamControls team="home" label="Home" dataState={dataState} updateState={updateState} completeMap={completeMap} undoMap={undoMap} />

                <TeamControls team="away" label="Away" dataState={dataState} updateState={updateState} completeMap={completeMap} undoMap={undoMap} />
            </Box>
        </Box>
    );
};

export default ControlPanel;
