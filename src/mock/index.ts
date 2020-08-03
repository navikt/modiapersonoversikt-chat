import FetchMock, {MiddlewareUtils} from 'yet-another-fetch-mock';
import {setupWsControlAndMock} from './context-mock';
import navfaker from "nav-faker";
import {setupControllWsMock} from "./dashboard-mock";
import {guid} from "nav-frontend-js-utils";

console.log('=========================='); // tslint:disable-line
console.log('======== MED MOCK ========'); // tslint:disable-line
console.log('=========================='); // tslint:disable-line
const mock = FetchMock.configure({
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
});

setupWsControlAndMock(mock);
setupControllWsMock(mock);

navfaker.random.arrayElement([])
export const starters = [
    'Hei,\njeg har ett lite spørsmål.',
    'God dagen. Kunne jeg stilt ett lite spørsmål?',
    'Skjera!! Kan dere ta kontakt med meg.'
];
export const followups = [
    'Det jeg lurer på er angående AAP',
    'Hvordan er egentlig greia med dagpenger nå om dagen',
    'Corona er skummelt og jeg lurer på hva jeg skal gjøre.'
];

export const ekstra = [
    'Fint og flott. Er det det samme med andre ytelser også?',
    'Hvordan blir dette om jeg også er selvstendig næringsdrivende? Påvirker det noe?',
    'Jeg forstår. Stor fare for at jeg blir permittert i løpet av høsten. Vil det endre noe?'
];

export const chatContent: any = {};
mock.get('/modiapersonoversikt-chat/api/plukk', (req, res, ctx) => {
    const fnr = navfaker.personIdentifikator.fødselsnummer();
    chatContent[fnr] = [
        { from: 'user', content: navfaker.random.arrayElement(starters) },
        { from: 'user', content: navfaker.random.arrayElement(followups) }
    ];

    return res(ctx.json({ fnr, id: guid() }));
});


mock.get('/modiapersonoversikt-chat/api/chat/:fnr', (req, res, ctx) => res(
    ctx.json(chatContent[req.pathParams.fnr])
));

mock.post('/modiapersonoversikt-chat/api/chat/:fnr/send', (req, res, ctx) => {
    const content = chatContent[req.pathParams.fnr] || [];
    content.push({ from: 'nav', content: req.body });
    content.push({ from: 'user', content: navfaker.random.arrayElement(ekstra) });
    chatContent[req.pathParams.fnr] = content;

    return res(
        ctx.json(content)
    );
});
