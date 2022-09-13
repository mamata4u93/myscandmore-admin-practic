import React, { useEffect } from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import { useIntl } from 'react-intl';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import AppRowContainer from '../../@crema/core/AppRowContainer';
import { Button, Card, Checkbox, Col, Form, Input } from 'antd';
import './index.style.less';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import { ReactComponent as Logo } from '../../assets/user/login.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { adminLogin } from '../../store/AuthRedux'

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const onFinish = () => {
    let params = {phone: '7799989455',password: 'Demo@123', loginType: "phone", employeeID: "7799989455" }
   
    dispatch(adminLogin(params))
  };

  useEffect(() => {
    if (token) {
      navigate('/dashboards/viewprofile');
    }
  }, [token]);

  const onGoToForgetPassword = () => {
    navigate('/forget-password');
  };

  function onRememberMe(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const { messages } = useIntl();
  return (
    <div className='login-pages'>
      <AppAnimateGroup type='bottom'>
        <AppPageMetadata title='Signin' />
        <div className='user-container'>
          <Card className='user-card user-card-lg'>
            <AppRowContainer>
              <Col xs={24} md={12}>
                <div className='user-styled-img'>
                  <Logo />
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div className='user-card-header'>
                  <h3>
                    <IntlMessages id='common.login' />
                  </h3>
                </div>

                <Form
                  className='user-form'
                  name='basic'
                  initialValues={{
                    remember: true,
                    // email: 'someAdmin1@disco.com',
                    phone: '7799989455',
                    password: 'Demo@123',
             
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name='phone'
                    className='form-field'
                    rules={[
                      { required: true, message: 'Please input your phone' },
                    ]}>
                    <Input placeholder={messages['common.email']} />
                  </Form.Item>

                  <Form.Item
                    name='password'
                    className='form-field'
                    rules={[
                      { required: true, message: 'Please input your Password!' },
                    ]}>
                    <Input
                      type='password'
                      placeholder={messages['common.password']}
                    />
                  </Form.Item>

                  {/* <Form.Item
                    className='user-field-action'
                    name='remember'
                    valuePropName='checked'>
                    <>
                      <span className='user-field-action-link ml-auto' onClick={onGoToForgetPassword}>
                        <IntlMessages id='common.forgetPassword' />
                      </span>
                    </>
                  </Form.Item> */}
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='user-form-btn'>
                    <IntlMessages id='common.login' />
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

export default Signin;
