export enum Temagruppe {
    Arbeid = 'ARBD',
    Familie = 'FMLI',
    Hjelpemiddel = 'HJLPM',
    Bil = 'BIL',
    OrtopediskHjelpemiddel = 'ORT_HJE',
    Ovrig = 'OVRG',
    Pensjon = 'PENS',
    PleiepengerSyktBarn = 'PLEIEPENGERSY',
    Uforetrygd = 'UFRT',
    Utland = 'UTLAND',
    AndreSosiale = 'ANSOS',
    OkonomiskSosial = 'OKSOS'
}

export const temagruppeNavn = {
    [Temagruppe.Arbeid]: "Arbeid",
    [Temagruppe.Familie]: "Familie",
    [Temagruppe.Hjelpemiddel]: "Hjelpemidler",
    [Temagruppe.Bil]: "Hjelpemidler bil",
    [Temagruppe.OrtopediskHjelpemiddel]: "Ortopediske hjelpemidler",
    [Temagruppe.Pensjon]: "Pensjon",
    [Temagruppe.PleiepengerSyktBarn]: "Pleiepenger sykt barn",
    [Temagruppe.Uforetrygd]: "Uføretrygd",
    [Temagruppe.Utland]: "Utland",
    [Temagruppe.OkonomiskSosial]: "Økonomisk sosialhjelp",
    [Temagruppe.AndreSosiale]: "Andre sosiale tjenester",
    [Temagruppe.Ovrig]: "Øvrige henvendelser"
};

export const godkjenteTemagrupper = [
    Temagruppe.Arbeid,
    Temagruppe.Familie,
    Temagruppe.Hjelpemiddel,
    Temagruppe.Pensjon,
    Temagruppe.Ovrig
];

export function temagruppeTekst(temagruppe: Temagruppe): string {
    return temagruppeNavn[temagruppe] ?? "Ukjent temagruppe";
}
