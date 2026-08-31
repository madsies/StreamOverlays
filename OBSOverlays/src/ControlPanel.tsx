
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";

import { useBroadcastState } from "./hooks/useBroadcastState";
import { ow2Heroes } from "./utils/heroes";
import { useEffect, useState } from "react";

type TeamControlsProps = {
    team: "home" | "away";
    label: string;
    dataState: any;
    updateState: (state: any) => void;
};

const TeamControls = ({ team, label, dataState, updateState }: TeamControlsProps) => {
    const data = dataState[team];

    const update = (changes: any) => updateState({ [team]: { ...data, ...changes } });

    const updateScore = (delta: number) => update({ score: Math.max(0, data.score + delta) });

    
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
        <Card sx={{ background: "#5B383E", color: "white", borderTop: `4px solid ${data.colour}` }}>
            <CardContent>
                <Typography variant="h5" fontWeight={700} mb={3}>{label}</Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                    <TextField
                        label="Team name"
                        value={data.name}
                        onChange={e => update({ name: e.target.value })}
                        fullWidth
                    />

                    <Box>
                        <Typography variant="body2" mb={1}>Score</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Button variant="contained" onClick={() => updateScore(-1)}>-</Button>
                            <Typography variant="h4" fontWeight={700} sx={{ minWidth: 50, textAlign: "center" }}>
                                {data.score}
                            </Typography>
                            <Button variant="contained" onClick={() => updateScore(1)}>+</Button>
                        </Box>
                    </Box>

                    <FormControl fullWidth>
                        <InputLabel>Banned hero</InputLabel>
                        <Select value={data.ban ?? ""} label="Banned hero" onChange={e => update({ ban: e.target.value || null })}>
                            <MenuItem value="">No ban</MenuItem>
                            {ow2Heroes.map(hero => <MenuItem key={hero} value={hero}>{hero}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <Box>
                        <Typography variant="body2" mb={1}>Team colour</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <input
                                type="color"
                                value={colour}
                                onChange={e => setColour(e.target.value)}
                                style={{ width: 60, height: 40, padding: 2, cursor: "pointer", background: "transparent", border: "none" }}
                            />
                            <Typography>{data.colour}</Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

const ControlPanel = () => {
    const { dataState, updateState } = useBroadcastState();


    return (
        <Box sx={{ minHeight: "100vh", boxSizing: "border-box", background: "#ac7b7b", color: "#f9fafb", p: 4 }}>
            <Typography variant="h4" fontWeight={700} mb={4}>Broadcast Controller</Typography>



            <Card sx={{ mb: 3, maxWidth: 1000, background: "#472830", color: "white" }}>
                <CardContent>
                    <Typography variant="h5" fontWeight={700} mb={3}>Match Settings</Typography>



                    <FormControl sx={{ minWidth: 220 }}>
                        <InputLabel>Match format</InputLabel>
                        <Select value={dataState.type} label="Match format" onChange={e => updateState({ type: e.target.value })}>
                            <MenuItem value="Bo1">Best of 1</MenuItem>
                            <MenuItem value="Bo3">Best of 3</MenuItem>
                            <MenuItem value="Bo5">Best of 5</MenuItem>
                            <MenuItem value="Bo7">Best of 7</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="outlined"
                        onClick={() =>
                            updateState({
                                home: dataState.away,
                                away: dataState.home,
                            })
                        }
                        sx={{padding:1.5, mx:2, height:56}}
                    >
                        Swap Sides
                    </Button>
                </CardContent>
            </Card>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, maxWidth: 1000 }}>
                <TeamControls team="home" label="Home" dataState={dataState} updateState={updateState} />
                <TeamControls team="away" label="Away" dataState={dataState} updateState={updateState} />
            </Box>
        </Box>
    );
};

export default ControlPanel;

