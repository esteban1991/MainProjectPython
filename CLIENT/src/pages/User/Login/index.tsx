import Footer from '@/components/Footer';
// import { login } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { PageContainer, Settings as LayoutSettings,ProForm, ProFormUploadButton, ProFormGroup} from '@ant-design/pro-components';
import defaultSettings from '../../../../config/defaultSettings';
import {
  // AlipayCircleOutlined,
  LockOutlined,
  // MobileOutlined,

  UserOutlined,

  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { Alert, Col, message, Row, Upload, Tabs, Space, MessageArgsProps } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import styles from './index.less';

// Import GraphQL LOGIN mutation
import { LOGIN , REGISTER} from '@/graphql/mutation'; // <- Do not forget to import inside brackets {}

// Import useMutation hook from Apollo Client
import { gql, useMutation } from '@apollo/client';
import { stubFalse } from 'lodash';

const LoginMessage: React.FC<{
  content: string;
  type:string;
}> = ({ content ,type}) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type={type}
      showIcon
    />
  );
};


/**
 * This method will jump to the location of the redirect parameter
 */
 const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const [loginUser] = useMutation(LOGIN);
  const [registerUser] = useMutation(REGISTER);



  if (!initialState || !initialState.settings) {
     return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.dark;

  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
     className =  `${styles.dark}`;
     //console.log(navTheme)
  }

  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };


  

  const handleSubmitLogin = async (values: API.LoginParams) => {
    setSubmitting(true);
      try {
        // Iniciar sesión
        // const msg = await login({ ...values, type });
        // if (msg.status === 'ok') {
        //   const defaultLoginSuccessMessage = intl.formatMessage({
        //     id: 'pages.login.success',
        //   });
        //   message.success(defaultLoginSuccessMessage);
        //   await fetchUserInfo();
        //   const urlParams = new URL(window.location.href).searchParams;
        //   history.push(urlParams.get('redirect') || '/');
        //   return;
        // }
        // console.log(msg);

        localStorage.clear();

        // format variables if email or not
        const re = /\S+@\S+\.\S+/;
        //const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const varlog =  re.test(String(values.username).toLowerCase()) === true ? 
          {
            email:  values.username,
            password:values.password,

          } :
          {
            username: values.username,
            password:values.password,

          }

        // Login
        const { data, errors } = await loginUser({
          variables: varlog,
        });

        // Store data to local storage unless an error occurs
        if (!errors && data.login.success ) {
          const defaultLoginSuccessMessage = intl.formatMessage({
             id: 'pages.login.success',
          });          
          message.success(defaultLoginSuccessMessage);



          localStorage.setItem('token', data.login.token);
          localStorage.setItem('id', data.login.user.id);
          localStorage.setItem('username', data.login.user.username);
          localStorage.setItem('email', data.login.user.email);
          localStorage.setItem('company', data.login.user.companyname);
          localStorage.setItem('colorprimary', data.login.user.colorprimary);
          localStorage.setItem('navtheme', data.login.user.navtheme);

          //localStorage.setItem('role-id', data.login.user.role.id);
          //localStorage.setItem('role-name', data.login.user.role.name);
          //localStorage.setItem('role-description', data.login.user.role.description);
          //localStorage.setItem('role-type', data.login.user.role.type);
          console.info('Data has been saved in localstorage !');
          console.info('You are on :', location.pathname);
          //history.push('/');
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          console.info('After push, you are on :', location.pathname);
          return;
        } else {

          const defaultLoginFailureCredentials = intl.formatMessage({
            id: 'pages.login.failureCredentials',
          });

          const defaultLoginFailureServer = intl.formatMessage({
            id: 'pages.login.failureServer',
          });          
  
          message.error(errors ? defaultLoginFailureServer : defaultLoginFailureCredentials );
          
          console.error('An Apollo client error happened :', errors);
        }
        // Si falla, establezca el mensaje de error del usuario
        //setUserLoginState(msg);
        console.log(errors)
      } catch (error) {
        const defaultLoginFailureMessage = intl.formatMessage({
          id: 'pages.login.failureServer',
        });
        console.log(error);
        message.error(defaultLoginFailureMessage + error);
      }
  };

  const handleSubmitRegister = async (values: API.RegisterParams) => {
    setSubmitting(true);
      try {

        // Create User
        //console.log(values)
        const { data, errors } = await registerUser({
          variables: {
            email:values.email,
            username:values.username,
            password1:values.password1,
            password2:values.password2
          },
        });

        // Store data to local storage unless an error occurs
        if (data.register.success) {

          message.success("Usuario Creado correctamente!");
          //Limpiar campos
        } else {
          message.error("Error al guardar el user");
          //Me quede aqui, Si falla, establezca el mensaje de error del usuario
          //setUserLoginState(msg);
        }

      } catch (error) {

        //console.log(error);
        message.error("Error salvando datos de usuario");
      }

  };
  const { status, type: loginType } = userLoginState;

  return (
    //  <PageContainer>
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logoClient.svg" />}
          title="Core Client"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          submitter={type === 'account' ?
            ({searchConfig: { submitText: intl.formatMessage({ id: 'pages.login.submit' })} }):
            ({searchConfig: { submitText: intl.formatMessage({ id: 'pages.login.registerAccount' })} })}
          actions= {type === 'account'?([

            <FormattedMessage
              key="loginWith"
              id="pages.login.loginWith"
            />,
            <GoogleOutlined key="GoogleOutlined" className={styles.icon} />,
            // <TwitterOutlined key="TwitterOutlined" className={styles.icon} />,
            // <InstagramOutlined key="InstagramOutlined" className={styles.icon} />,
          ]):''}
          onFinish={type === 'account'? async (values: API.LoginParams) => {
            await handleSubmitLogin(values as API.LoginParams);
          }:async (values: API.RegisterParams) => {
            await handleSubmitRegister(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.login.Login.tab',
                }),
              },
              {
                key: 'create',
                label: intl.formatMessage({
                  id: 'pages.login.Register.tab',
                }),
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage'
              })}
              type='error'
            />
          )}

          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder'
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder'
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                      />
                    ),
                  },
                ]}
              />

              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <ProFormCheckbox noStyle name="autoLogin">
                  <FormattedMessage id="pages.login.rememberMe" />
                </ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                >
                  <FormattedMessage id="pages.login.forgotPassword" />
                </a>
              </div>
            </>

          )}

          {status === 'error' && loginType === 'create' && <LoginMessage content="Error de código de verificación" />}
          {type === 'create' && (
            <>
              {/* Create account here */}
              {/* <ProForm> */}
              <ProForm.Group>
              <Row>
                <Col span={8}>
                <ImgCrop rotate>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && '+ Imagen'}
                  </Upload>
                </ImgCrop>
                </Col>
                <Col span={16}>
                <ProFormText
                  width="md"
                  name="username"
                />
                <ProFormText
                  width="md"
                  name="email"
                />
                </Col>
              </Row>
              <Row gutter={5}>
                <Col span={12}>
                <ProFormText.Password
                  name="password1"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                        />
                      ),
                    },
                  ]}
                  />
                </Col>
                <Col span={12}>
                <ProFormText.Password
                  name="password2"
                  placeholder="Contraseña"
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                        />
                      ),
                    },
                  ]}
                  />
                </Col>
              </Row>
              </ProForm.Group>

              {/* </ProForm> */}

              {/* <ProFormText
                fieldProps={{
                  size: 'middle',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={intl.formatMessage({
                  id: 'pages.login.phoneNumber.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.required"
                      />
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.invalid"
                      />
                    ),
                  },
                ]}
              /> */}

              {/* <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: 'por favor ingrese el código de verificación',
                })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${intl.formatMessage({
                      id: 'pages.getCaptchaSecondText',
                    })}`;
                  }
                  return intl.formatMessage({
                    id: 'pages.login.phoneLogin.getVerificationCode',
                    defaultMessage: 'obtener código de verificación',
                  });
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.captcha.required"
                        defaultMessage="por favor ingrese el código de verificación!"
                      />
                    ),
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await getFakeCaptcha({
                    phone,
                  });
                  if (result === false) {
                    return;
                  }
                  message.success('¡Obtenga el código de verificación con éxito! El código de verificación es: 1234');
                }}
              /> */}
              {/* Create account here */}
            </>
          )}


        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
