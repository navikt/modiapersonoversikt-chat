import FetchMock from 'yet-another-fetch-mock';
import { WebSocket, Server } from 'mock-websocket';

export const enheter = [
    { enhetId: '0219', navn: 'NAV Bærum' },
    { enhetId: '4100', navn: 'NKS' },
    { enhetId: '0118', navn: 'NAV Aremark' },
    { enhetId: '0604', navn: 'NAV Kongsberg' },
    { enhetId: '0602', navn: 'NAV Drammer' }
];

export function setupWsControlAndMock(mock: FetchMock) {
    (window as any).WebSocket = WebSocket;
    const contextServer = new Server('wss://veilederflatehendelser-q0.adeo.no/modiaeventdistribution/ws/Z999999');
    contextServer.start();

    const me = {
        ident: 'Z999999',
        navn: 'Fornavn Ettersen',
        fornavn: 'Fornavn',
        etternavn: 'Ettersen',
        enheter: enheter
    };

    mock.get('/modiacontextholder/api/decorator', (req, res, ctx) => res(ctx.json(me)));
    mock.get('https://app.adeo.no/modiacontextholder/api/decorator', (req, res, ctx) => res(ctx.json(me)));
}
