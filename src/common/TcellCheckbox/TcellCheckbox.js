import React from 'react';
import Checkbox from '../checkbox';

class TcellCheckbox extends React.Component {

    render() {
        const { value } = this.props;
        const { error, ...rest } = this.props;
        return (
            <div>
                <Checkbox checked={value} {...rest} />
                {error ? <span>{error}</span> : null}
            </div>
        );
    }
}

export default TcellCheckbox;