import React, {Component} from 'react';

class Screen extends Component {
    render() {
        const calc = this.props.input.join('')
        return (
            <div className = "screen">
                {calc}
            </div>
        )
    }
}

export default Screen