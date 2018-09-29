import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { mapStateToProps } from './selectors';


class Application extends Component {

    static propTypes = {
      applicationVersion:   PropTypes.string.isRequired
    };

    render() {
        const { applicationVersion } = this.props;
        return(
            <div>
                application version {applicationVersion}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Application);