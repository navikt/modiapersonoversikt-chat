import useFetch, {hasError, isPending} from "@nutgaard/use-fetch";
import {default as React, useState} from "react";
import Spinner from "nav-frontend-spinner";
import Snakkeboble from "nav-frontend-snakkeboble";
import {Textarea} from "nav-frontend-skjema";

function submit(fnr: string, text: string): Promise<any> {
    return fetch(`/modiapersonoversikt-chat/api/chat/${fnr}/send`, {
        method: 'POST',
        body: text
    });
}

function ChatWindow(props: { fnr: string }) {
    const chat = useFetch<Array<{ from: string; content: string; }>>(`/modiapersonoversikt-chat/api/chat/${props.fnr}`);
    const [text, setText] = useState('');
    if (isPending(chat)) {
        return <Spinner/>
    } else if (hasError(chat)) {
        return <p>Beklager, kunne ikke laste inn chat.</p>
    }

    const snakkebobler = chat.data
        .map((melding, i) => (
            <Snakkeboble key={i} pilHoyre={melding.from === 'nav'}>{melding.content}</Snakkeboble>
        ));

    return (
        <div className="persontab__chatwindow">
            <div className="persontab__chatcontent">
                {snakkebobler}
            </div>
            <form>
                <Textarea
                    label="Enter for å sende"
                    maxLength={0} value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13 && !e.shiftKey) {
                            submit(props.fnr, text)
                                .then(() => {
                                    setText('');
                                    chat.rerun();
                                })
                        }
                    }}
                />
            </form>
        </div>
    );
}

export default ChatWindow;
