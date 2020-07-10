import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useAppSelector} from "./index";


export type TabId = string;

export enum TabType {
    DASHBOARD, PERSON
}

type TabBase<TYPE extends TabType> = { id: TabId; type: TYPE; hasChanges: boolean; }

export type DashboardTab = TabBase<TabType.DASHBOARD>
export type PersonTab = TabBase<TabType.PERSON> & { fnr: string; }
export type Tab = DashboardTab | PersonTab;

export function isPersonTab(tab: Tab): tab is PersonTab {
    return tab.type === TabType.PERSON;
}

export type TabsState = {
    tabs: {
        [key: string]: Tab
    };
    active: TabId;
}

const initialState: TabsState = {
    tabs: {
        'DASHBOARD': {id: 'DASHBOARD', type: TabType.DASHBOARD, hasChanges: false}
    },
    active: 'DASHBOARD'
};

const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        openTab(state, action: PayloadAction<PersonTab>) {
            const tab: Tab = action.payload;
            state.tabs[tab.id] = tab;
        },
        closeTab(state, action: PayloadAction<TabId>) {
            const id: TabId = action.payload;
            delete state.tabs[id];
        },
        switchTab(state, action: PayloadAction<TabId>) {
            state.active = action.payload;
        },
        markChanged(state, action: PayloadAction<{ id: TabId; hasChange: boolean; }>) {
            if (state.tabs[action.payload.id]) {
                state.tabs[action.payload.id].hasChanges = action.payload.hasChange;
            }
        }
    }
});

export const { openTab, closeTab, switchTab, markChanged } = tabsSlice.actions;
export default tabsSlice.reducer;
export const useTabs = () => useAppSelector(state => state.tabs);
