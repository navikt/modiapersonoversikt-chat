import FetchMock, {MiddlewareUtils} from 'yet-another-fetch-mock';
import {setupWsControlAndMock} from './context-mock';
import navfaker from "nav-faker";

console.log('=========================='); // tslint:disable-line
console.log('======== MED MOCK ========'); // tslint:disable-line
console.log('=========================='); // tslint:disable-line
const mock = FetchMock.configure({
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
});
setupWsControlAndMock(mock);

navfaker.random.arrayElement([])
const starters = [
    'Hei,\njeg har ett lite spørsmål.',
    'God dagen. Kunne jeg stilt ett lite spørsmål?',
    'Skjera!! Kan dere ta kontakt med meg.'
];
const followups = [
    'Det jeg lurer på er angående AAP',
    'Hvordan er egentlig greia med dagpenger nå om dagen',
    'Corona er skummelt og jeg lurer på hva jeg skal gjøre.'
];

const ekstra = [
    'Fint og flott. Er det det samme med andre ytelser også?',
    'Hvordan blir dette om jeg også er selvstendig næringsdrivende? Påvirker det noe?',
    'Jeg forstår. Stor fare for at jeg blir permittert i løpet av høsten. Vil det endre noe?'
];

const chatContent: any = {};
mock.get('/modiapersonoversikt-chat/api/plukk', (req, res, ctx) => {
    const fnr = navfaker.personIdentifikator.fødselsnummer();
    chatContent[fnr] = [
        { from: 'user', content: navfaker.random.arrayElement(starters), chatDato:  new Date().toLocaleString() },
        { from: 'user', content: navfaker.random.arrayElement(followups),chatDato: new Date().toLocaleString() }
    ];

    return res(ctx.json({ fnr }));
});


mock.get('/modiapersonoversikt-chat/api/chat/:fnr', (req, res, ctx) => res(
    ctx.json(chatContent[req.pathParams.fnr])
));

mock.get('/journalforing', (req, res, ctx) => res(
    ctx.json(true)
));

mock.post('/modiapersonoversikt-chat/api/chat/:fnr/send', (req, res, ctx) => {
    const content = chatContent[req.pathParams.fnr] || [];
    content.push({ from: 'nav', content: req.body, chatDato:  new Date().toLocaleString() });
    content.push({ from: 'user', content: navfaker.random.arrayElement(ekstra), chatDato:  new Date().toLocaleString() });
    chatContent[req.pathParams.fnr] = content;

    return res(
        ctx.json(content)
    );
});
