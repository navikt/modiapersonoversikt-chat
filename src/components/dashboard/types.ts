import {Temagruppe} from "../../utils/temagruppe-utils";

export type RequestEvent = { type: 'REQUEST', time: string, temagruppe: Temagruppe, id: string, fnr: string };
export type ApproveEvent = { type: 'APPROVED', time: string, id: string, ident: string };
export type CloseEvent = { type: 'CLOSE', time: string, id: string };
export type WSEvent = RequestEvent | ApproveEvent | CloseEvent;
