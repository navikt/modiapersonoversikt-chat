import * as React from "react";

type AugmentetProps<PROPS> = PROPS & { visibleIf?: boolean; }

function visibleIfHOC<PROPS>(component: React.ComponentType<PROPS>, defaultVisibility: boolean = true): React.ComponentType<AugmentetProps<PROPS>> {
    return (props: AugmentetProps<PROPS>) => {
        if (props.visibleIf ?? defaultVisibility) {
            return React.createElement(component, props);
        }
        return null;
    }
}

export default visibleIfHOC;
