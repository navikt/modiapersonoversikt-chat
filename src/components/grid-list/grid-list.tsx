import * as React from 'react';
import classNames from "classnames";
import {Element, Normaltekst} from 'nav-frontend-typografi';
import './grid-list.less';

const cls = (className?: string) => classNames('grid-list', className);
type Column<DATA> = {
    header: string;
    format(value: DATA): string | undefined;
    react?: (value: DATA) => React.ReactNode;
    width?: string;
}
type Props<DATA> = {
    className?: string;
    columns: Array<Column<DATA>>;
    data: Array<DATA>;
}

function GridList<DATA extends {}>(props: Props<DATA>) {
    const gridTemplateColumns = {gridTemplateColumns: props.columns.map((column) => column.width ?? '1fr').join(' ')};

    const headerItems = props.columns.map((column) => (
        <Element tag="div" className="grid-list__header-item">
            {column.header}
        </Element>
    ));

    const rows = props.data.map((item, index) => {
        const values = props.columns.map((column) => ({
            header: column.header,
            formatted: column.format(item),
            reactElement: column.react ? column.react(item) : column.format(item)
        }));
        const valueItems = values.map(({ reactElement }, index) => (
            <Normaltekst key={index} tag="div" className="grid-liste__row-item">
                {reactElement}
            </Normaltekst>
        ));

        const ariaLabel = values
            .filter(({ formatted }) => formatted)
            .map((value) => `${value.header}: ${value.formatted}`).join(' ');

        return (
            <div key={index} className="grid-list__row" style={gridTemplateColumns} aria-label={ariaLabel}>
                {valueItems}
            </div>
        )
    });

    return (
        <section className={cls(props.className)}>
            <header className="grid-list__header" style={gridTemplateColumns}>{headerItems}</header>
            {rows}
        </section>
    );
}

export default GridList;
