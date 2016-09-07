import * as React from 'react';
import * as $ from 'jquery';

export class NotFound extends React.Component<{}, {}> {
    constructor () {
        super();
    }
    render () {
        return (
            <div>
                <h4>No existe :c</h4>
            </div>
        );
    }
}
