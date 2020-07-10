import * as React from 'react';
import './persontab.less';
import ChatWindow from "./chatwindow";

interface Props {
    fnr: string;
}

function Persontab(props: Props) {
    return (
        <div className="persontab">
            <iframe className="persontab__persondata" title={props.fnr} src={`https://navikt.github.io/modiapersonoversikt/#/person/${props.fnr}?chatvisning`}/>
            <div className="persontab__chat">
                <ChatWindow fnr={props.fnr}/>
            </div>
        </div>
    );
}

export default Persontab;
