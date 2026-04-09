import * as React from 'react';

export interface AlertBoxProps extends React.HTMLAttributes<HTMLElement> {
    type?: 'note' | 'tip' | 'important' | 'warning' | 'caution';
    alert?: string;
    oneline?: boolean;
}

export declare const AlertBox: React.ForwardRefExoticComponent<AlertBoxProps & React.RefAttributes<HTMLElement>>;

export default AlertBox;
