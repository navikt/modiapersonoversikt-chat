import * as React from 'react';
import {Systemtittel} from "nav-frontend-typografi";
import {Flatknapp} from "nav-frontend-knapper";
import Veilederpanel from 'nav-frontend-veilederpanel';
import { ReactComponent as Veileder } from './veileder.svg';
import {ObjectState} from "../../hooks/use-objectstate";
import {DashboardControl, GodkjentTemagruppe, WSRequest} from "./use-dashboard-control";
import GridList from "../grid-list/grid-list";
import {AppDispatch, useAppDispatch} from "../../redux";
import {openTab, PersonTab, switchTab, TabType} from "../../redux/tabs";

interface Props {
    temagruppe: ObjectState<GodkjentTemagruppe | undefined>;
    dashboard: DashboardControl;
}

function apneChat(dispatch: AppDispatch, id: string) {
    return () => {
        fetch(`/modiapersonoversikt-chat/api/plukk/${id}`)
            .then(resp => resp.json())
            .then(json => {
                const tab: PersonTab = {id: json.fnr, type: TabType.PERSON, fnr: json.fnr, hasChanges: false};
                dispatch(openTab(tab));
                dispatch(switchTab(json.fnr));
            });
    };
}

function DashboardListe(props: Props) {
    const dispatch = useAppDispatch();
    if (props.temagruppe.value === undefined) {
        return (
            <Veilederpanel fargetema={"info"} svg={<Veileder />}>
                <Systemtittel>Velg en temagruppe for å se brukere som venter på svar</Systemtittel>
            </Veilederpanel>
        );
    }

    const list: Array<WSRequest> = props.temagruppe.value ? props.dashboard.requests[props.temagruppe.value] : []

    return (
        <GridList<WSRequest>
            columns={[
                {
                    header: "Tidspunkt",
                    format: (value: WSRequest) => new Date(value.time).toLocaleTimeString('nb')
                },
                {
                    header: "Fødselsnummer",
                    format: (value: WSRequest) => value.fnr
                },
                {
                    header: "Saksbehandler",
                    format: (value: WSRequest) => value.ident ?? '-'
                },
                {
                    header: "Plukk samtale",
                    format: (value: WSRequest) => undefined,
                    react: (value: WSRequest) => (
                        <Flatknapp mini onClick={apneChat(dispatch, value.id)}>Plukk</Flatknapp>
                    ),
                    width: '7rem'
                }

            ]}
            data={list}
        />
    );
}

export default DashboardListe;
