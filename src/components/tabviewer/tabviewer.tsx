import * as React from 'react';
import Panel from "nav-frontend-paneler";
import Snakkeboble from "nav-frontend-snakkeboble";
import {Textarea} from "nav-frontend-skjema";
import Spinner from "nav-frontend-spinner";
import { Flatknapp } from 'nav-frontend-knapper';
import {isPersontab, Tab} from "../../application";
import './tabviewer.less';
import {Ingress, Undertittel} from "nav-frontend-typografi";
import {Dispatch, useState} from "react";
import {SetStateAction} from "react";
import useFetch, { isPending, hasError } from "@nutgaard/use-fetch";
import Modal from 'nav-frontend-modal';
import AlertStripe from "nav-frontend-alertstriper";

interface Props {
    tabs: Array<Tab>;
    setTabs: Dispatch<SetStateAction<Array<Tab>>>;
    tabIndex: number;
    setTabIndex: Dispatch<SetStateAction<number>>;
}

interface Melding {
    from: string;
    content: string;
    chatDato: string;
}

function apneChat(props: Props) {
    return () => {
        fetch('/modiapersonoversikt-chat/api/plukk')
            .then(resp => resp.json())
            .then(json => {
                props.setTabs((tabs) => [...tabs, {fnr: json.fnr }]);
                props.setTabIndex(props.tabs.length);
            });
    };
}

function submit(fnr: string, text: string): Promise<any> {
    return fetch(`/modiapersonoversikt-chat/api/chat/${fnr}/send`, {
        method: 'POST',
        body: text
    });
}

function KoBoks(props: { temagruppe: string } & Props) {
    return (
        <Panel className="koboks">
            <Undertittel className="blokk-xxxs">{props.temagruppe}</Undertittel>
            <Ingress className="blokk-xxs">{Math.round(Math.random() * 20)} i kø</Ingress>
            <Flatknapp onClick={apneChat(props)}>Start</Flatknapp>
        </Panel>
    );
}

function Journalfor() {
    const [apenModal, setApenModal] = useState(false);

    const submit = () => {
        setApenModal(!apenModal);
        return fetch(`/journalforing`, {
            method: 'POST',
        });
    }

    return(
        <div className={"journalforingspanel"}>
            <Flatknapp style={{width:'100%'}} onClick={() => submit()} >Journalfør chat</Flatknapp>
                <Modal
                    isOpen={apenModal}
                    onRequestClose={() => setApenModal(!apenModal)}
                    closeButton={true}
                    contentLabel="Journalføring"
                >
                    <div style={{padding:'2rem 2.5rem'}}>
                        <AlertStripe  type="suksess">Chatten ble journalført</AlertStripe>
                    </div>
                </Modal>
        </div>
    )
}

function ChatWindow(props: { fnr: string }) {
    const [text, setText] = useState('');

    const chat = useFetch<Array<Melding>>(`/modiapersonoversikt-chat/api/chat/${props.fnr}`);
    if (isPending(chat)) {
        return <Spinner />
    } else if (hasError(chat)) {
        return <p>Beklager, kunne ikke laste inn chat.</p>
    }


    const snakkebobler = chat.data
        .map((melding, i) => (
            <Snakkeboble topp={melding.chatDato} key={i} pilHoyre={melding.from === 'nav'}>{melding.content}</Snakkeboble>
        ));

    return (
        <div className="chatwindow">
       <Journalfor/>
            <div className="chatcontent">
                {snakkebobler}
            </div>
            <form>
                <Textarea
                    label="Enter for å sende"
                    maxLength={0} value={text}
                    onChange={(e) => { setText(e.target.value); }}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13 && !e.shiftKey) {
                            submit(props.fnr, text)
                                .then(() => {
                                    setText('');
                                    chat.rerun();
                                })
                        }
                    }}
                />
            </form>
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
                            <ChatWindow fnr={tab.fnr} />
                        </div>
                    </div>
                );
            } else {
                return (
                    <div key={tab} className={['dashboard', isInactive ? 'inactivetab' : ''].join(' ')} aria-hidden={isInactive}>
                        <KoBoks {...props} temagruppe="Arbeid" />
                        <KoBoks {...props} temagruppe="Familie" />
                        <KoBoks {...props} temagruppe="Hjelpemiddel" />
                        <KoBoks {...props} temagruppe="Bil" />
                        <KoBoks {...props} temagruppe="Pensjon" />
                        <KoBoks {...props} temagruppe="Øvrige" />
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
