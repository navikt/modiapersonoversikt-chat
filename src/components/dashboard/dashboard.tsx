import * as React from 'react';
import Panel from "nav-frontend-paneler";
import {Ingress, Undertittel} from "nav-frontend-typografi";
import {Flatknapp} from "nav-frontend-knapper";
import {AppDispatch, useAppDispatch} from "../../redux";
import { openTab, switchTab, PersonTab, TabType } from "../../redux/tabs";
import './dashboard.less';

function KoBoks(props: { temagruppe: string }) {
    const dispatch = useAppDispatch();

    return (
        <Panel className="koboks">
            <Undertittel className="blokk-xxxs">{props.temagruppe}</Undertittel>
            <Ingress className="blokk-xxs">{Math.round(Math.random() * 20)} i kø</Ingress>
            <Flatknapp onClick={apneChat(dispatch)}>Start</Flatknapp>
        </Panel>
    );
}

function apneChat(dispatch: AppDispatch) {
    return () => {
        fetch('/modiapersonoversikt-chat/api/plukk')
            .then(resp => resp.json())
            .then(json => {
                const tab: PersonTab = {id: json.fnr, type: TabType.PERSON, fnr: json.fnr, hasChanges: false};
                dispatch(openTab(tab));
                dispatch(switchTab(json.fnr));
            });
    };
}

function Dashboard() {
    return (
        <div className="dashboard">
            <KoBoks temagruppe="Arbeid"/>
            <KoBoks temagruppe="Familie"/>
            <KoBoks temagruppe="Hjelpemiddel"/>
            <KoBoks temagruppe="Bil"/>
            <KoBoks temagruppe="Pensjon"/>
            <KoBoks temagruppe="Øvrige"/>
        </div>
    );
}

export default Dashboard;
