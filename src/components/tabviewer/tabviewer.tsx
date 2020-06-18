import * as React from 'react';
import Panel from "nav-frontend-paneler";
import Snakkeboble from "nav-frontend-snakkeboble";
import {TextareaControlled} from "nav-frontend-skjema";
import { Flatknapp } from 'nav-frontend-knapper';
import {isPersontab, Tab} from "../../application";
import './tabviewer.less';
import {Ingress, Undertittel} from "nav-frontend-typografi";

interface Props {
    tabs: Array<Tab>;
    tabIndex: number;
}

function KoBoks(props: { temagruppe: string }) {
    return (
        <Panel className="koboks">
            <Undertittel className="blokk-xxxs">{props.temagruppe}</Undertittel>
            <Ingress className="blokk-xxs">{Math.round(Math.random() * 20)} i kø</Ingress>
            <Flatknapp>Start</Flatknapp>
        </Panel>
    );
}

function ChatWindow() {
    return (
        <div className="chatwindow">
            <div className="chatcontent">
                <Snakkeboble>
                    Hei! Jeg lurer på en ting...
                </Snakkeboble>
                <Snakkeboble pilHoyre>
                    Hei! Hva kan jeg hjelpe deg med
                </Snakkeboble>
                <Snakkeboble>
                    Jeg lurer noe angående corona
                </Snakkeboble>
                <Snakkeboble pilHoyre>
                    Det burde jeg kunne hjelpe til med.
                </Snakkeboble>
            </div>
            <TextareaControlled label="Enter for å sende" maxLength={0} defaultValue="" />
        </div>
    );
}

function TabViewer(props: Props) {
    const tabElements = props.tabs
        .map((tab, index) => {
            const isInactive = index !== props.tabIndex;
            if (isPersontab(tab)) {
                return (
                    <div key={tab.fnr} className={['persontab', isInactive ? 'inactivetab' : ''].join(' ')} aria-hidden={isInactive}>
                        <iframe title={tab.fnr} src={`https://navikt.github.io/modiapersonoversikt/#/person/${tab.fnr}?chatvisning`} />
                        <div className="persontab__chat">
                            <ChatWindow />
                        </div>
                    </div>
                );
            } else {
                return (
                    <div key={tab} className={['dashboard', isInactive ? 'inactivetab' : ''].join(' ')} aria-hidden={isInactive}>
                        <KoBoks temagruppe="Arbeid" />
                        <KoBoks temagruppe="Familie" />
                        <KoBoks temagruppe="Hjelpemiddel" />
                        <KoBoks temagruppe="Bil" />
                        <KoBoks temagruppe="Pensjon" />
                        <KoBoks temagruppe="Øvrige" />
                    </div>
                );
            }
        });
    return (
        <div className="tabviewer">
            {tabElements}
        </div>
    )
}

export default TabViewer;
