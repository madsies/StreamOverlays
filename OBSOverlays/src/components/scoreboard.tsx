import { Box, Typography } from "@mui/material";
import { useBroadcastState } from "../hooks/useBroadcastState";
import { useEffect, useState } from "react";

export type TeamState = {
    name: string;
    seed: number;
    score: number;
    teamLogoPath: string;
    ban: string | null;
    colour: string;
};

export type BroadcastState = {
    home: TeamState;
    away: TeamState;
    type: string;
    maps: (number | null)[];
};

function MapTabs({
    score,
    colour,
    mapsToWin,
    home,
}: {
    score: number;
    colour: string;
    mapsToWin: number;
    home: boolean;
}) {
    return (
        <Box
            sx={{
                display: "flex",gap: "4px",
                width: "90%",px:"5%",
                height: 16,mb:1,
            }}
        >
            {Array.from({ length: mapsToWin }).map((_, i) => (
                <Box
                    key={i}
                    sx={{
                        flex: 1,height: 12,
                        background: home ? (i < score ? colour: "#2f2f2f") : (i >= mapsToWin - score ? colour : "#2f2f2f"),
                        borderRadius: "3px 3px 3px 3px",
                        clipPath: home ? "polygon(5% 0, 100% 0, 95% 100%, 0% 100%);" : "polygon(0 0, 95% 0, 100% 100%, 5% 100%);",
                        transition:"background-color 1.5s ease"
                    }}
                />
            ))}
        </Box>
    );
}


function HeroImage({ hero }: { hero: string | null }) {
    const [displayHero, setDisplayHero] = useState(hero);
    const [oldHero, setOldHero] = useState<string | null>(null);

    useEffect(() => {
        if (hero === displayHero) return;

        setOldHero(displayHero);
        setDisplayHero(hero);

        const timeout = setTimeout(() => {
            setOldHero(null);
        }, 400);

        return () => clearTimeout(timeout);
    }, [hero]);

    return (
        <Box sx={{ position: "relative", width: 75, height: 75 }}>
            {oldHero && (
                <Box
                    key={`old-${oldHero}`}
                    component="img"
                    src={`/heroes/${oldHero}.webp`}
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: 75,
                        height: 75,
                        animation: "fadeOut 0.8s ease forwards",
                        "@keyframes fadeOut": {
                            from: { opacity: 1 },
                            to: { opacity: 0 },
                        },
                    }}
                />
            )}

            {displayHero && (
                <Box
                    key={`new-${displayHero}`}
                    component="img"
                    src={`/heroes/${displayHero}.webp`}
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: 75,
                        height: 75,
                        animation: "fadeIn 0.8s ease forwards",
                        "@keyframes fadeIn": {
                            from: { opacity: 0 },
                            to: { opacity: 1 },
                        },
                    }}
                />
            )}
        </Box>
    );
}

function Scoreboard() {

    const { dataState } = useBroadcastState();

    const TEAM_SIZE = 600;
    const WIDTH = 75;

    const bestOf = parseInt(
        dataState.type.replace("Bo", ""),
        10
    );

    const mapsToWin = Math.ceil(bestOf / 2);

    return (
        <Box
            sx={{width: "100vw",height: "100vh",boxSizing: "border-box",display: "flex",justifyContent: "space-between", px: 4,}}
        >
            <Box sx={{width: TEAM_SIZE, mt:3}}>
                <MapTabs
                    score={dataState.home.score}
                    colour={dataState.home.colour}
                    mapsToWin={mapsToWin}
                    home={true}
                />

                <Box sx={{background: dataState.home.colour,height: WIDTH,display:"flex",  justifyContent: "space-between", borderRadius:1.5, alignItems:"center" }}>

                            
                    <Typography fontSize={42} textAlign={"center"} fontWeight={800} color="white" m={2}>
                        {dataState.home.name}
                    </Typography>

                    <Box sx={{display:"flex", height:WIDTH, width:WIDTH*2}}>
                        <Box
                            sx={{
                                position: "relative",width: WIDTH,height: WIDTH,display: "flex",
                                alignItems: "center",justifyContent: "center",
                            }}
                        >
                            <HeroImage hero={dataState.home.ban}/>
                            

                            <Typography
                                sx={{position: "absolute",top: "85%",left: "50%",transform: "translate(-50%, -50%)",color: "#f1f1f1",fontWeight: "bold",fontSize: 22, textShadow:"2px 2px 4px black"}}>
                                BAN
                            </Typography>
                        </Box>
                        <Box sx={{ background: "#1b1b1b", width: WIDTH,height: WIDTH, borderTopRightRadius:1.5, borderBottomRightRadius: 1.5}}>
                            <Typography fontSize={52} textAlign={"center"} fontWeight={800}  color="white">
                                {dataState.home.score}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{background:"#2f2f2f", width:"100px", height:"25px", border:"1px black", borderBottomRightRadius:5, borderBottomLeftRadius:5}}>
                <Typography textAlign={"center"} fontWeight={600} color="white">
                    {dataState.type}
                </Typography>
                
            </Box>

            <Box sx={{width: TEAM_SIZE, mt:3}}>
                <MapTabs
                        score={dataState.away.score}
                        colour={dataState.away.colour}
                        mapsToWin={mapsToWin}
                        home={false}
                    />
                <Box sx={{background: dataState.away.colour, height: WIDTH,display:"flex", justifyContent: "space-between", borderRadius:1.5, alignItems:"center"}}>
                    <Box sx={{display:"flex", height:WIDTH, width:WIDTH*2}}>
                        <Box sx={{ background: "#1b1b1b",width: WIDTH,height: WIDTH, borderTopLeftRadius:1.5, borderBottomLeftRadius: 1.5}}>
                            <Typography fontSize={52} textAlign={"center"} fontWeight={800} color="white">
                                {dataState.away.score}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                position: "relative",width: WIDTH,height: WIDTH,display: "flex",
                                alignItems: "center",justifyContent: "center",
                            }}
                        >

                                <HeroImage hero={dataState.away.ban}/>

                                <Typography
                                    sx={{position: "absolute",top: "85%",left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        color: "#f1f1f1",fontWeight: "bold",fontSize: 22, textShadow:"2px 2px 4px black"}}>
                                    BAN
                                </Typography>
                        </Box>
                    </Box>
                    <Typography fontSize={42} textAlign={"center"} fontWeight={800} color="white" m={2}>
                        {dataState.away.name}
                    </Typography>
                </Box>
                </Box>

        </Box>
    );
}

export default Scoreboard;