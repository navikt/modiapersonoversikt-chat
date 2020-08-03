import * as React from 'react';
import {Dispatch, SetStateAction} from "react";
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import {Temagruppe, temagruppeTekst} from "../../utils/temagruppe-utils";
import {GodkjentTemagruppe, WSRequest} from "../dashboard/use-dashboard-control";
import './temagruppe-valg.less';
import {ObjectState} from "../../hooks/use-objectstate";

interface Props {
    active: ObjectState<GodkjentTemagruppe | undefined>;
    requests: Record<GodkjentTemagruppe, Array<WSRequest>>;
}


function TemagruppeValg(props: Props) {
    const temagrupper = Object.entries(props.requests).map(([temagruppe, requests]) => {
        const gruppe = temagruppe as GodkjentTemagruppe;
        return (
            <div className="temagruppevalg__radiovalg" key={gruppe}>
                <input
                    type="radio"
                    name="temagruppevalg"
                    value={gruppe}
                    id={`temagruppevalg-${gruppe}`}
                    checked={props.active.value === gruppe}
                    onChange={() => props.active.setValue(gruppe)}
                />
                <label htmlFor={`temagruppevalg-${temagruppe}`}>
                    <Normaltekst tag="span">
                        {`${temagruppeTekst(gruppe)} (${requests.length} i kø)`}
                    </Normaltekst>
                </label>
            </div>
        );
    });

    return (
        <div className="temagruppevalg">
            <div className="temagruppevalg__radiovalg">
                <input
                    type="radio"
                    name="temagruppevalg"
                    value="N/A"
                    id="temagruppevalg-N/A"
                    checked={props.active.value === undefined}
                    onChange={() => props.active.setValue(undefined)}
                />
                <label htmlFor="temagruppevalg-N/A">
                    <Normaltekst tag="span">
                        Ikke påkoblet
                    </Normaltekst>
                </label>
            </div>
            {temagrupper}
        </div>
    )
}

export default TemagruppeValg;
