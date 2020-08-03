import * as React from 'react';
import {temagruppeTekst} from "../../utils/temagruppe-utils";
import {GodkjentTemagruppe, useDashboardControl} from "./use-dashboard-control";
import DashboardListe from "./dashboard-liste";
import {useObjectState} from "../../hooks/use-objectstate";
import './dashboard.less';
import TemagruppeValg from "../temagruppe-valg/temagruppe-valg";
import {Innholdstittel} from "nav-frontend-typografi";
import DashboardFremside from "./dashboard-fremside";

function Dashboard() {
    const liste = useObjectState<GodkjentTemagruppe | undefined>(undefined);
    const dashboard = useDashboardControl();
    return (
        <div className="dashboard">
            <div className="dashboard__temagrupper">
                <TemagruppeValg active={liste} requests={dashboard.requests}/>
            </div>
            <div className="dashboard__valgtemagruppe">
                {liste.value && <Innholdstittel className="blokk-xs">
                    {liste.value ? temagruppeTekst(liste.value) : 'Ikke påkoblet'}
                </Innholdstittel>
                }
            </div>
            <div className="dashboard__liste">
                <DashboardFremside visibleIf={liste.value === undefined} />
                <DashboardListe temagruppe={liste} dashboard={dashboard} visibleIf={liste.value !== undefined} />
            </div>
        </div>
    );
}

export default Dashboard;
