import * as React from 'react';
import './tabviewer.less';
import Dashboard from "../dashboard/dashboard";
import {isPersonTab, Tab, TabId, TabsState, useTabs} from "../../redux/tabs";
import Persontab from "../persontab/persontab";

function TabRenderer({ tab, activeTabId }: { tab: Tab, activeTabId: TabId}) {
    const isInactive = tab.id !== activeTabId;
    let content = undefined;
    let tabClassName = undefined;
    if (isPersonTab(tab)) {
        tabClassName = 'tabviewer__persontab';
        content = <Persontab fnr={tab.fnr} />;
    } else {
        tabClassName = 'tabviewer__dashboard';
        content = <Dashboard />;
    }

    const className = ['tabviewer__tab', tabClassName, isInactive ? 'tabviewer__tab--inactive' : '']
        .filter((cls) => cls.length > 0)
        .join(' ');

    return (
        <div
            key={tab.id}
            className={className}
            aria-hidden={isInactive}
        >
            {content}
        </div>
    );
}

function TabViewer() {
    const tabState: TabsState = useTabs();
    const tabs: Array<Tab> = Object.values<Tab>(tabState.tabs);

    const tabElements = tabs.map((tab: Tab) => <TabRenderer tab={tab} activeTabId={tabState.active} />);

    return (
        <div className="tabviewer">
            {tabElements}
        </div>
    )
}

export default TabViewer;
