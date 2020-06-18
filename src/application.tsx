import * as React from 'react';
import {useState} from "react";
import {TabsPure} from 'nav-frontend-tabs';
import 'nav-frontend-core';
import 'nav-frontend-typografi-style';
import Decorator from './components/decorator/decorator';
import TabViewer from "./components/tabviewer/tabviewer";

export type PersonTab = { fnr: string}
export type Tab = 'DASHBOARD' | PersonTab;

export function isPersontab(tab: Tab): tab is PersonTab {
    return tab !== 'DASHBOARD';
}

function Application() {
    const [tabs, setTabs] = useState<Array<Tab>>(['DASHBOARD', { fnr: '10108000398' }]);
    const [tabIndex, setTabIndex] = useState<number>(0);

    const tabselector = tabs.map((tab, i) => ({
        label: isPersontab(tab) ? tab.fnr : 'Dashboard',
        aktiv: i === tabIndex
    }));

    return (
        <>
            <Decorator/>
            <TabsPure tabs={tabselector} onChange={(_, index) => setTabIndex(index)}/>
            <TabViewer tabs={tabs} tabIndex={tabIndex} />
        </>
    );
}

export default Application;
