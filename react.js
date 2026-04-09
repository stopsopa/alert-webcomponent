import React from 'react';
import './alert-box.js';

export const AlertBox = React.forwardRef((props, ref) => {
  const { type, alert, oneline, children, ...rest } = props;
  
  const wcProps = { ...rest, ref };
  if (type) wcProps.type = type;
  if (alert) wcProps.alert = alert;
  if (oneline !== undefined) {
    if (oneline) {
      wcProps['data-oneline'] = '';
    }
  }

  return React.createElement('alert-box', wcProps, children);
});

export default AlertBox;
