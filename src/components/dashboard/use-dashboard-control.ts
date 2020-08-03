import {useMemo, useState} from "react";
import {WSEvent} from "./types";
import {useOnMount} from "../../hooks/use-onmount";
import {useWebsocket} from "../../hooks/use-webhook";
import {Temagruppe} from "../../utils/temagruppe-utils";
import {Listeners} from "../../utils/websocket-impl";

export type WSRequest = {
    temagruppe: Temagruppe;
    time: Date;
    id: string;
    fnr: string;
    ident: string | undefined;
}

export type GodkjentTemagruppe =
    | typeof Temagruppe.Arbeid
    | typeof Temagruppe.Familie
    | typeof Temagruppe.Hjelpemiddel
    | typeof Temagruppe.Pensjon
    | typeof Temagruppe.Ovrig;

export type DashboardControl = {
    connection: boolean;
    requests: Record<GodkjentTemagruppe, Array<WSRequest>>;
}

export function useDashboardControl(): DashboardControl {
    const [state, setState] = useState<Array<WSRequest>>([]);
    const [connection, setConnection] = useState<boolean>(false);
    useOnMount(() => {
        fetch('/modiapersonoversikt-chat/api/control')
            .then((resp) => resp.json())
            .then((json) => {
                setState(json)
            });
    });

    const wsListeners: Listeners = useMemo(() => ({
        onMessage(event: MessageEvent): void {
            const data = JSON.parse(event.data) as WSEvent;
            setState((currentState) => {
                if (data.type === 'REQUEST') {
                    return [...currentState, {
                        id: data.id,
                        time: new Date(),
                        temagruppe: data.temagruppe,
                        fnr: data.fnr,
                        ident: undefined
                    }];
                } else if (data.type === 'APPROVED') {
                    const index = currentState.findIndex((e) => e.id === data.id);
                    const newState = [...currentState];
                    newState[index].ident = data.ident;
                    return newState;
                } else if (data.type === 'CLOSE') {
                    const index = currentState.findIndex((e) => e.id === data.id);
                    const newState = [...currentState];
                    newState.splice(index, 1);
                    return newState;
                } else {
                    return currentState;
                }
            });
        },
        onOpen(event: Event) {
            setConnection(true);
        },
        onClose(event: CloseEvent) {
            setConnection(false);
        },
        onError(event: Event) {
            setConnection(false);
        }
    }), [setState]);

    useWebsocket('wss://app-q0.adeo.no/modiapersonoversikt-chat/api/control-ws', wsListeners);

    const requests = useMemo(() => ({
        ARBD: state.filter((wsevent) => wsevent.temagruppe === Temagruppe.Arbeid),
        FMLI: state.filter((wsevent) => wsevent.temagruppe === Temagruppe.Familie),
        HJLPM: state.filter((wsevent) => wsevent.temagruppe === Temagruppe.Hjelpemiddel),
        OVRG: state.filter((wsevent) => wsevent.temagruppe === Temagruppe.Ovrig),
        PENS: state.filter((wsevent) => wsevent.temagruppe === Temagruppe.Pensjon),
    }), [state]);

    return useMemo(() => ({ connection, requests }), [connection, requests]);
}
