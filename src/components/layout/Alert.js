import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './Alert.module.css';

function Alert({ alerts }) {
  return (
    alerts?.length > 0 && (
      <ul>
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className={`${styles.alert} ${styles.alert + alert.alertType}`}
          >
            {alert.message}
          </li>
        ))}
      </ul>
    )
  );
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
