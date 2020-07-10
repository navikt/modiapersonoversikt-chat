import * as React from 'react';
import {TabsPure} from 'nav-frontend-tabs';
import 'nav-frontend-core';
import 'nav-frontend-typografi-style';
import Decorator from './components/decorator/decorator';
import TabViewer from "./components/tabviewer/tabviewer";
import {useAppDispatch} from "./redux";
import {isPersonTab, switchTab, Tab, TabsState, useTabs} from "./redux/tabs";

function Application() {
    const dispatch = useAppDispatch();
    const tabState: TabsState = useTabs();
    const tabs: Array<Tab> = Object.values<Tab>(tabState.tabs);
    const activeTab = tabState.active;

    const setTabIndex = (event: React.SyntheticEvent<EventTarget>, index: number) => {
        dispatch(switchTab(tabs[index].id))
    };

    const tabselector = tabs.map((tab, i) => ({
        label: isPersonTab(tab) ? tab.fnr : 'Dashboard',
        aktiv: tab.id === activeTab
    }));

    return (
        <>
            <Decorator/>
            <TabsPure tabs={tabselector} onChange={setTabIndex}/>
            <TabViewer />
        </>
    );
}

export default Application;
