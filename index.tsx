import { DOMParser } from "https://esm.sh/linkedom";
import { serve } from "https://deno.land/std@0.184.0/http/server.ts";
import { GetNewBoard, MovePiece } from "./src/board-commands.ts";


const NEW_BOARD_ROUTE = new URLPattern({ pathname: "/get-new-board" });
const MOVE_PIECE_ROUTE = new URLPattern({ pathname: "/move-piece" });

const link = () => {
    return (
        <>
        </>);
}
async function handler(req: Request): Promise<Response> {

    const newBoardMatch = NEW_BOARD_ROUTE.exec(req.url);
    const movePieceMatch = MOVE_PIECE_ROUTE.exec(req.url);


    if (newBoardMatch) {
        return new Response(`${GetNewBoard()}`);
    }

    if (movePieceMatch && !!req.body) {
        const reqJson = await req.json();
        const fromSquare = reqJson.fromSquare;
        const toSquare = reqJson.toSquare;
        const board = reqJson.board;
        const currentTeam = reqJson.currentTeam;
        return new Response(`${MovePiece(fromSquare, toSquare, JSON.parse(board), currentTeam)}`);
    }

    return new Response('Not found (try <a href="/get-new-board">/get-new-board</a>)', {
        status: 404,
    });
}

console.log("Listening on http://localhost:8000");
serve(handler);