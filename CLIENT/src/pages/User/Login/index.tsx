import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { PageContainer, Settings as LayoutSettings } from '@ant-design/pro-components';
import defaultSettings from '../config/defaultSettings';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
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
import { FormattedMessage, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { Alert, message, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import styles from './index.less';

// Import GraphQL LOGIN mutation
import { LOGIN } from '@/graphql/mutation'; // <- Do not forget to import inside brackets {}

// Import useMutation hook from Apollo Client
import { gql, useMutation } from '@apollo/client';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
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

  // if (!initialState || !initialState.settings) {
  //   return null;
  // }

  // const { navTheme, layout } = initialState.settings;
  // let className = styles.dark;

  // if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
  //   className =  `${styles.dark}`;
  //   //console.log(navTheme)
  // }

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

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // Iniciar sesión
      // const msg = await login({ ...values, type });
      // if (msg.status === 'ok') {
      //   const defaultLoginSuccessMessage = intl.formatMessage({
      //     id: 'pages.login.success',
      //     defaultMessage: '¡Inicio de sesión correcto!',
      //   });
      //   message.success(defaultLoginSuccessMessage);
      //   await fetchUserInfo();
      //   const urlParams = new URL(window.location.href).searchParams;
      //   history.push(urlParams.get('redirect') || '/');
      //   return;
      // }
      // console.log(msg);

      localStorage.clear();

      // Login
      const { data, errors } = await loginUser({
        variables: {
          password:values.password,
          username:values.username,
        },
      });

      // Store data to local storage unless an error occurs
      if (!errors) {
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('id', data.login.user.id);
        localStorage.setItem('username', data.login.user.username);
        localStorage.setItem('email', data.login.user.email);
        localStorage.setItem('company', data.login.user.companyname);
        localStorage.setItem('confirmed', data.login.user.confirmed);
        //localStorage.setItem('blocked', data.login.user.blocked);
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
        console.error('An Apollo client error happened :', errors);
      }
      // Si falla, establezca el mensaje de error del usuario
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Acceso fallido. Por favor intente nuevamente！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
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
          logo={<img alt="logo" src="/logo.svg" />}
          title="Core Client"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <FormattedMessage
              key="loginWith"
              id="pages.login.loginWith"
              defaultMessage="Otros métodos de inicio de sesión"
            />,
            
            <GoogleOutlined key="GoogleOutlined" className={styles.icon} />,
            // <TwitterOutlined key="TwitterOutlined" className={styles.icon} />,
            // <InstagramOutlined key="InstagramOutlined" className={styles.icon} />,
          ]}
          onFinish={async (values: API.LoginParams) => {
            await handleSubmit(values as API.LoginParams);
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
                  id: 'pages.login.accountLogin.tab',
                  defaultMessage: 'Inicio de sesión de contraseña de cuenta',
                }),
              },
              {
                key: 'mobile',
                label: intl.formatMessage({
                  id: 'pages.login.phoneLogin.tab',
                  defaultMessage: 'Inicio de sesión de número de móvil',
                }),
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: 'Cuenta o contraseña incorrectas(admin/ant.design)',
              })}
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
                  id: 'pages.login.username.placeholder',
                  defaultMessage: 'nombre de usuario: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="por favor ingrese el nombre de usuario!"
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
                  id: 'pages.login.password.placeholder',
                  defaultMessage: 'clave: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="¡Por favor, introduzca su contraseña!"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && <LoginMessage content="Error de código de verificación" />}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={intl.formatMessage({
                  id: 'pages.login.phoneNumber.placeholder',
                  defaultMessage: 'Número de teléfono',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.required"
                        defaultMessage="¡Por favor ingrese el número de teléfono!"
                      />
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.invalid"
                        defaultMessage="¡Número de teléfono mal formado!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormCaptcha
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
                      defaultMessage: 'obtener código de verificación',
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
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="inicio de sesión automático" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="Se te olvidó tu contraseña" />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
    //</PageContainer>
  );
};

export default Login;
