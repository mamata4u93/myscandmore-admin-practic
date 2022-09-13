import React, { useState, useEffect, Fragment, PureComponent } from 'react';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Input, InputNumber } from 'antd';
import styles from './PhoneView.less';

function PhoneView(props) {
  const { value, onChange, disabled } = props;
  const [numberValue, setNumber] = useState(value || '');

  useEffect(() => {
    setNumber(value || undefined)
  }, [value]);


  return <Fragment>
    <Input.Group compact>
      <Input readOnly style={{ width: '15%' }} defaultValue="+91" />
      <Input type={'number'} disabled={disabled} style={{ width: '85%' }} onChange={e => onChange(e)} value={numberValue} placeholder={'Phone'} />
    </Input.Group>
  </Fragment>
}

export default PhoneView
