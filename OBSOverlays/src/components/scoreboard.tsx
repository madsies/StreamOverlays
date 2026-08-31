import { Box, Typography } from "@mui/material";
import { useBroadcastState } from "../hooks/useBroadcastState";

export type TeamState = {
    name: string;
    seed: number;
    score: number;
    teamLogoPath: string;
    ban: string | null;
};

export type BroadcastState = {
    home: TeamState;
    away: TeamState;
    type: string;
    maps: (number | null)[];
};

export const idataState: BroadcastState = {
    home: {
        name: "Home Team",
        seed: 1,
        score: 0,
        teamLogoPath: "",
        ban: "cassidy",
    },

    away: {
        name: "Away Team",
        seed: 2,
        score: 0,
        teamLogoPath: "",
        ban: "ana",
    },

    type: "Bo5",

    maps: [0, 1, 2],
};

function Scoreboard() {

    const { dataState } = useBroadcastState();

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                boxSizing: "border-box",
                display: "flex",justifyContent: "space-between",
                px: 4,
            }}
        >
            <Box sx={{background: "#652ede",width: 700,height: 85,display:"flex", justifyContent: "space-between", mt:4, borderRadius:1.5, alignItems:"center" }}>
                <Typography fontSize={42} textAlign={"center"} fontWeight={800} color="white" m={2}>
                    {dataState.home.name}
                </Typography>

                <Box sx={{ background: "#1b1b1b", width: 85,height: 85, borderTopRightRadius:1.5, borderBottomRightRadius: 1.5}}>
                    <Typography fontSize={52} textAlign={"center"} fontWeight={800} color="white">
                        {dataState.home.score}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{background:"#2f2f2f", width:"100px", height:"25px", border:"1px black", borderBottomRightRadius:5, borderBottomLeftRadius:5}}>
                <Typography textAlign={"center"} fontWeight={600} color="white">
                    {dataState.type}
                </Typography>
                
            </Box>

            <Box sx={{background: "#51d73a",width: 700,height: 85,display:"flex", justifyContent: "space-between", borderRadius:1.5, mt:4, alignItems:"center"}}>
                <Box sx={{ background: "#1b1b1b",width: 85,height: 85, borderTopLeftRadius:1.5, borderBottomLeftRadius: 1.5}}>
                    <Typography fontSize={52} textAlign={"center"} fontWeight={800} color="white">
                        {dataState.away.score}
                    </Typography>
                </Box>

                <Typography fontSize={42} textAlign={"center"} fontWeight={800} color="white" m={2}>
                    {dataState.away.name}
                </Typography>
            </Box>

        </Box>
    );
}

export default Scoreboard;