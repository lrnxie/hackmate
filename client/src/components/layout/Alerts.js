import React, { Fragment } from "react";
import { connect } from "react-redux";

import Alert from "@material-ui/lab/Alert";

const Alerts = ({ alerts }) => {
  return alerts !== null && alerts.length > 0 ? (
    alerts.map((alert) => (
      <Alert severity={alert.alertType} key={alert.id}>
        {alert.msg}
      </Alert>
    ))
  ) : (
    <Fragment></Fragment>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
