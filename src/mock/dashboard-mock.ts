import FetchMock from 'yet-another-fetch-mock';
import {Server, WebSocket} from 'mock-websocket';
import {godkjenteTemagrupper, Temagruppe} from "../utils/temagruppe-utils";
import {guid} from "nav-frontend-js-utils";
import navfaker from "nav-faker";
import {jittery} from "./utils";
import {RequestEvent, WSEvent} from "../components/dashboard/types";
import {chatContent, followups, starters} from "./index";

const state: Array<RequestEvent> = new Array(30)
    .fill(0)
    .map(() => createRequest());

function createRequest(): RequestEvent {
    return {
        type: "REQUEST",
        time: new Date().toISOString(),
        temagruppe: navfaker.random.arrayElement(godkjenteTemagrupper),
        id: guid(),
        fnr: navfaker.personIdentifikator.fødselsnummer()
    }
}

function publish(server: Server, content: WSEvent) {
    const body = JSON.stringify(content);
    server.send(body);
}

export function setupControllWsMock(mock: FetchMock) {
    (window as any).WebSocket = WebSocket;
    const controlServer = new Server('wss://app-q0.adeo.no/modiapersonoversikt-chat/api/control-ws');
    (window as any).controlServer = controlServer;

    controlServer.on('connection', (ws) => {
        ws.send(state[0]);
    });

    jittery(1000, 10000, () => {
        const event: RequestEvent = {
            type: "REQUEST",
            time: new Date().toISOString(),
            temagruppe: navfaker.random.arrayElement(godkjenteTemagrupper),
            id: guid(),
            fnr: navfaker.personIdentifikator.fødselsnummer()
        };

        state.push(event);
        publish(controlServer, event);

        if (state.length > 50) {
            const index = navfaker.random.integer(state.length - 1, 0);
            const removed: RequestEvent = state.splice(index, 1)[0];
            publish(controlServer, { type: 'CLOSE', time: new Date().toISOString(), id: removed.id });
        }
    });

    mock.get('/modiapersonoversikt-chat/api/control', (req, res, ctx) => res(
        ctx.json(state)
    ));

    mock.get('/modiapersonoversikt-chat/api/plukk/:id', (req, res, ctx) => {
        const id = req.pathParams.id;
        const chatRequest = state.find((request) => request.id === id);
        if (chatRequest) {
            chatContent[chatRequest.fnr] = [
                { from: 'user', content: navfaker.random.arrayElement(starters) },
                { from: 'user', content: navfaker.random.arrayElement(followups) }
            ];

            return res(ctx.json({ fnr: chatRequest.fnr }));
        } else {
            return res(ctx.status(404));
        }
    });
}
