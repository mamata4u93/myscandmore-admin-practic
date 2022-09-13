import React, { useEffect } from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import AppRowContainer from '../../@crema/core/AppRowContainer';
import { Button, Card, Checkbox, Col, Form, Input } from 'antd';
import { useIntl } from 'react-intl';
import './index.style.less';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import { ReactComponent as Logo } from '../../assets/user/signup.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { adminLogin } from '../../store/AuthRedux'

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const onFinish = (values) => {
    values['loginType'] = "email"
    dispatch(adminLogin(values))
  };

  useEffect(() => {
    if (token) {
      navigate('/login');
    }
  }, [token]);


  const { messages } = useIntl();

  return (
    <div className='login-pages'>
      <AppAnimateGroup type='bottom'>
        <AppPageMetadata title='Signup' />
        <div className='user-container' key='a'>
          <Card className='user-card user-card-lg'>
            <AppRowContainer>
              <Col xs={24} lg={12}>
                <div className='user-styled-img mln'>
                  <Logo />
                </div>
              </Col>

              <Col xs={24} lg={12}>
                <div className='user-card-header'>
                  <h3>
                    <IntlMessages id='common.signup' />
                  </h3>
                </div>

                <Form
                  className='user-form'
                  name='basic'
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name='name'
                    className='form-field'
                    rules={[
                      { required: true, message: 'Please input your Name!' },
                    ]}>
                    <Input placeholder={messages['common.name']} />
                  </Form.Item>

                  <Form.Item
                    name='email'
                    className='form-field'
                    rules={[
                      { required: true, message: 'Please input your Email!' },
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

                  <Form.Item
                    name='confirmPassword'
                    className='form-field'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Retype Password!',
                      },
                    ]}>
                    <Input
                      type='password'
                      placeholder={messages['common.retypePassword']}
                    />
                  </Form.Item>

                  <Form.Item
                    className='user-field-action user-field-action-row'
                    name='remember'
                    valuePropName='checked'>
                    <>
                      <Checkbox>
                        <IntlMessages id='common.iAgreeTo' />
                      </Checkbox>
                      <Link to='/terms' className='user-field-action-link'>
                        <IntlMessages id='common.termConditions' />
                      </Link>
                    </>
                  </Form.Item>

                  <Button
                    type='primary'
                    className='user-form-btn'
                    htmlType='submit'>
                    <IntlMessages id='common.signup' />
                  </Button>
                </Form>

                <div className='user-card-footer'>
                  <span>
                    <IntlMessages id='common.alreadyHaveAccount' />
                  </span>
                  <Link to='/signin' className='user-card-footer-link'>
                    <IntlMessages id='common.signInHere' />
                  </Link>
                </div>
              </Col>
            </AppRowContainer>
          </Card>
        </div>
      </AppAnimateGroup>
    </div>
  );
};

export default Signup;
