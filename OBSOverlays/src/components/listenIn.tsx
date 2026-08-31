import { Box, Typography } from "@mui/material";
import { useBroadcastState } from "../hooks/useBroadcastState";

function ListenIn() {
    const { dataState } = useBroadcastState();

    const homeActive = dataState.home.listenIn;
    const awayActive = dataState.away.listenIn;

    return (
        <>
            <Box
                sx={{
                    position: "fixed", top: 200,
                    left: 0,width: 260,height: 80,
                    background: dataState.home.colour,
                    transform: homeActive ? "translateX(-2%)" : "translateX(-100%)",
                    opacity: homeActive ? 0.9 : 0,
                    transition: "transform 1.2s ease, opacity 1.2s ease",
                    zIndex: 1000,
                    borderRadius:2,
                    p:2,
                }}
            >
                <Typography sx={{ color: "white", fontSize: 36, fontWeight: 800, textAlign:"right" }}>
                    Comms Check
                </Typography>
                <Typography sx={{ color: "white", fontSize: 24, fontWeight: 700, textAlign:"right" }}>
                    {dataState.home.name}
                </Typography>
            </Box>

            <Box
                sx={{
                    position: "fixed",
                    top: 200,
                    right: 0,
                    width: 260,
                    height: 80,
                    background: dataState.away.colour,
                    transform: awayActive ? "translateX(2%)" : "translateX(100%)",
                    opacity: awayActive ? 0.9 : 0,
                    transition: "transform 1.2s ease, opacity 1.2s ease",
                    zIndex: 1000,
                    borderRadius:2,
                    p:2,
                }}
            >
                <Typography sx={{ color: "white", fontSize: 36,  fontWeight: 800}}>
                    Comms Check
                </Typography>
                <Typography sx={{ color: "white", fontSize: 24, fontWeight: 700 }}>
                    {dataState.away.name}
                </Typography>
            </Box>
        </>
    );
}

export default ListenIn;