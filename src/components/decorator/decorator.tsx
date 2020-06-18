import * as React from 'react';
import NAVSPA from '@navikt/navspa';
import {DecoratorProps} from "./decoratorprops";

const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

function Decorator() {
    return (
        <InternflateDecorator appname="Modiapersonoversikt chat"/>
    );
}

export default Decorator;
