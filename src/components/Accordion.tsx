import React from 'react';

export interface AccordionProps<T = any> {
    data: T[];
    multiple?: boolean,
    openByDefault?: boolean,
    keyParent?: string | number;
    Child: (item: T) => JSX.Element;
    Parent: (item: T) => JSX.Element;
}

const Accordion: React.SFC<AccordionProps> = ({ multiple, openByDefault, data, Parent, Child, keyParent }) => <>
    <div className="accordion">
        <div className="tabs">
            {
                data.map((m, i) => {
                    const key = 'ap_' + (keyParent ? m[keyParent] : i);
                    return (
                        <div key={key} className="tab">
                            <input
                                id={key}
                                name={multiple ? key : 'rd'}
                                defaultChecked={openByDefault}
                                type={multiple ? 'checkbox' : 'radio'}
                            />
                            <label className="tab-label" htmlFor={key}>
                                {Parent(m)}
                            </label>
                            <div className="tab-content">
                                {Child(m)}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
</>;

export { Accordion };

// https://codepen.io/raubaca/pen/PZzpVe
