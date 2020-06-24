import {useState} from "react";
import {Flatknapp, Hovedknapp} from "nav-frontend-knapper";
import Modal from "nav-frontend-modal";
import  { AlertStripeInfo } from "nav-frontend-alertstriper";
import './journalforing.less';

import * as React from "react";
import {CheckboksPanelGruppe} from "nav-frontend-skjema";
import {Normaltekst, Ingress} from "nav-frontend-typografi";
interface SakProps {
    setSak : (sak: string) => void;
}

interface ModalProps {
    submit: () => void;
    erJournalfort: boolean;
}
function VelgSak(props: SakProps) {
    return (
        <CheckboksPanelGruppe
        legend={'Velg sak'}
        checkboxes={[
            { label: 'Dagpenger', value: 'Dagpenger', id: 'Dagpenger' },
            { label: 'Foreldrepenger', value: 'Foreldrepenger', id: 'Foreldrepenger' },
            { label: 'Bidrag', value: 'Bidrag', id: 'Bidrag' },
            { label: 'Arbeidsavklaringspenger', value: 'Bidrag', id: 'Bidrag' }
        ]}
        onChange={(_ ,value ) => {props.setSak(value)}}
        className={"radiobuttons"}
    />)
}

function JournalforingsModal(props: ModalProps) {
    const [sak, setSak] = useState('');
    if(!sak && !props.erJournalfort){
        return (
            <VelgSak setSak={setSak}/>
        );
    }
    if(props.erJournalfort){
        return(
        <AlertStripeInfo>
            Tråden er journalført
        </AlertStripeInfo>)
    }

    return (
        <div className={"oppsummering"}>
            <Ingress>Journalfør på {sak}</Ingress>
            <Normaltekst>SaksID: 0000</Normaltekst>
            <Hovedknapp onClick={() => props.submit()} style={{margin:'2rem'}}>Journalfør</Hovedknapp>
        </div>
    )

}
export function Journalfor() {
    const [apenModal, setApenModal] = useState(false);
    const [erJournalfort, setErJournalfort] = useState(false);
    const submit = () => {
         fetch(`/journalforing`, {
            method: 'POST',
        }).then((response) => {
            if(response.ok){
                setErJournalfort(true);
            }
        });
    }


    return(
        <div className={"journalforingspanel"}>
            <Flatknapp style={{width:'100%'}} onClick={() => setApenModal(!apenModal)}>Journalfør chat</Flatknapp>
            <Modal
                isOpen={apenModal}
                onRequestClose={() => setApenModal(!apenModal)}
                closeButton={true}
                contentLabel="Journalføring"
                className={"modal"}
            >
                <JournalforingsModal submit={submit} erJournalfort={erJournalfort}/>
            </Modal>
        </div>
    )
}