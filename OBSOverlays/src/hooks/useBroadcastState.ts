import { useEffect, useRef, useState } from "react";
import type { BroadcastState } from "../components/scoreboard";

const defaultState: BroadcastState = {
    home: {
        name: "Home Team",
        seed: 1,
        score: 0,
        teamLogoPath: "",
        ban: "cassidy",
        colour: "#652ede",
        listenIn: false,
    },

    away: {
        name: "Away Team",
        seed: 2,
        score: 0,
        teamLogoPath: "",
        ban: "ana",
        colour: "#51d73a",
        listenIn: false,
    },
    type: "Bo7",
    maps: [0, 1, 2],
};

export function useBroadcastState() {
    const [dataState, setDataState] =
        useState<BroadcastState>(defaultState);

    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket(
            "ws://localhost:4815/ws"
        );

        socketRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "state") {
                console.log("Received state:", message.data);
                setDataState(message.data);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => {
            socket.close();
            socketRef.current = null;
        };
    }, []);

    function updateState(
        changes: Partial<BroadcastState>
    ) {
        const newState: BroadcastState = {
            ...dataState,
            ...changes,
        };

        // Update the controller immediately
        setDataState(newState);

        // Send to server
        if (
            socketRef.current?.readyState ===
            WebSocket.OPEN
        ) {
            socketRef.current.send(
                JSON.stringify({
                    type: "update_state",
                    data: newState,
                })
            );
        } else {
            console.error("WebSocket isn't connected");
        }
    }

    return {
        dataState,
        updateState,
    };
}