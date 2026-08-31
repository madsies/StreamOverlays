
import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import path from "path";

const app = express();

const webServer = createServer(app);

const PORT = 4815;

const wss = new WebSocketServer({server:webServer, path:"/ws"});

const distPath = path.join(process.cwd(), "dist");

app.use(express.static(distPath));

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

export type TeamState = {
    name: string;
    seed: number;
    score: number;
    teamLogoPath: string;
    ban: string | null;
    colour: string;
    listenIn: boolean;
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
        ban: "Cassidy",
        colour: "#652ede",
        listenIn: false,
    },

    away: {
        name: "Away Team",
        seed: 2,
        score: 0,
        teamLogoPath: "",
        ban: "Ana",
        colour: "#51d73a",
        listenIn: false
    },

    type: "Bo7",

    maps: [0, 1, 2],
};


let dataState = idataState;

function broadcastData()
{
    const message = JSON.stringify({
        type: "state",
        data: dataState
    });

    wss.clients.forEach(client =>
    {
        if (client.readyState === WebSocket.OPEN)
        {
            client.send(message);
        }
    });
}

wss.on("connection", socket => {

    console.log("WebSocket client connected");

    socket.send(JSON.stringify({
        type: "state",
        data: dataState
    }));

    socket.on("message", message => {

        const data = JSON.parse(
            message.toString()
        );

        if (data.type === "update_state") {

            dataState = data.data;

            broadcastData();
        }
    });
});

webServer.listen(PORT, "127.0.0.1", () => {
    console.log(
        `Broadcast running at http://localhost:${PORT}`
    );
});