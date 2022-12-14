import React from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import { useIntl } from 'react-intl';
import AppRowContainer from '../../@crema/core/AppRowContainer';
import { Button, Card, Col, Form, Input } from 'antd';
import './index.style.less';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import { ReactComponent as Logo } from '../../assets/user/lock-screen.svg';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const UnlockScreen = () => {
  const { messages } = useIntl();

  return (
    <div className='login-pages'>
      <AppAnimateGroup type='bottom'>
        <AppPageMetadata title='Unlock Screen' />
        <div className='login-container' key='a'>
          <Card className='login-card login-card-lg login-card-unlock'>
            <AppRowContainer>
              <Col xs={24} md={12}>
                <div className='login-styled-img login-styled-img-auto'>
                  <Logo />
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div className='login-card-header'>
                  <h3>
                    <IntlMessages id='common.unlockScreen' />
                  </h3>
                </div>
                <div className='login-card-para'>
                  <span>
                    <IntlMessages id='common.unlockScreenTextOne' />
                  </span>
                  <span>
                    <IntlMessages id='common.unlockScreenTextTwo' />
                  </span>
                </div>

                <Form
                  className='login-form mb-0'
                  name='basic'
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}>
                  <Form.Item
                    name='password'
                    className='form-field-lg'
                    rules={[
                      { required: true, message: 'Please input your Password!' },
                    ]}>
                    <Input
                      type='password'
                      placeholder={messages['common.password']}
                    />
                  </Form.Item>

                  <Button
                    type='primary'
                    className='login-form-btn'
                    htmlType='submit'>
                    <IntlMessages id='common.unlockItForMe' />
                  </Button>
                </Form>
              </Col>
            </AppRowContainer>
          </Card>
        </div>
      </AppAnimateGroup>
    </div>
  );
};

export default UnlockScreen;
