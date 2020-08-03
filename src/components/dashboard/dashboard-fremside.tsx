import * as React from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import {ReactComponent as Veileder} from "./veileder.svg";
import {Systemtittel} from "nav-frontend-typografi";
import visibleIfHOC from "../../hocs/visible-if";

function DashboardFremside() {
    return (
        <Veilederpanel fargetema="info" svg={<Veileder />}>
            <Systemtittel>Velg en temagruppe for å se brukere som venter på svar</Systemtittel>
        </Veilederpanel>
    );
}

export default visibleIfHOC(DashboardFremside);
