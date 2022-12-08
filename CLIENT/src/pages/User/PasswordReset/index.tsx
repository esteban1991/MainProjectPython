import Footer from '@/components/Footer';

import { ProForm,  ProFormInstance , ProFormText} from '@ant-design/pro-components';


import React, { useState } from 'react';
import { Modal, message } from 'antd';
import styles from './index.less';

// Import GraphQL PASSWORDRESET mutation
import {PASSWORDRESET} from '@/graphql/mutation'; // <- Do not forget to import inside brackets {}


// Import useMutation hook from Apollo Client
import {  useMutation } from '@apollo/client';
import { history, useIntl, useModel } from '@umijs/max';
import { useRef } from 'react';
import { LockOutlined } from '@ant-design/icons';

const PasswordReset: React.FC = () => {

  const { initialState, setInitialState } = useModel('@@initialState');
  const [passwordResetUser] = useMutation(PASSWORDRESET);
  const loginPath = '/user/login';

  if (!initialState || !initialState.settings) {
     return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.dark;
  const intl = useIntl();
  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
    className =  `${styles.dark}`;
    //console.log(navTheme)
 }
  

const [open, setOpen] = useState(true);
const [confirmLoading, setConfirmLoading] = useState(false);


  const handlePasswordReset = async (values: API.ResetPasswordParams) => {
      try {
        setConfirmLoading(true);
        const tokenParam = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
        // const pw1 =  formRef.current?.getFieldValue("password1");
        // const pw2 =  formRef.current?.getFieldValue("password2");
        
        // Password Reset
        const { data, errors } = await passwordResetUser({
          variables: {
            token:  tokenParam,
            newPassword1: values.password1,
            newPassword2: values.password2,            
          },
          
        });        

        if (!errors && data.passwordReset.success ) {
          
          const defaultpasswordresetSuccessMessage = intl.formatMessage({
             id: 'pages.passwordReset.success',
          });          

          message.success(defaultpasswordresetSuccessMessage);
          setOpen(false);
          history.push(loginPath);
          return;

        } else {

          const listerror = data.passwordReset.errors.nonFieldErrors || 
                            data.passwordReset.errors.newPassword2;
          const msgerror = listerror && listerror[0].code; 

          const defaultpasswordresetFailure = intl.formatMessage({
              id: msgerror === 'invalid_token' ? 'pages.passwordReset.invalid_token' : 
                  msgerror === 'expired_token' ? 'pages.passwordReset.expired_token' :
                  msgerror === 'password_mismatch' ? 'pages.passwordReset.password_mismatch' :
                  msgerror === 'password_too_short' ? 'pages.passwordReset.password_too_short' :
                  msgerror === 'password_too_common' ? 'pages.passwordReset.password_too_common' :
                  msgerror === 'password_entirely_numeric' ? 'pages.passwordReset.password_entirely_numeric' :
                  'pages.passwordReset.failure'  ,
              });


          const defaultpasswordresetFailureServer = intl.formatMessage({
            id: 'pages.passwordReset.failureServer',
          });          
 
          message.error(errors ? defaultpasswordresetFailureServer : defaultpasswordresetFailure );
        }
      } 
      catch (error) {
        const defaultpasswordresetFailureMessage = intl.formatMessage({
          id: 'pages.passwordReset.failureServer',
        });
        message.error(defaultpasswordresetFailureMessage + error);
      }
      finally{
        setConfirmLoading(false);
      }
      
  };


  const formRef = useRef<
    ProFormInstance<{
      password1: string;
      password2: string;
    }>
  >();


  const handleCancel = () => {
    setOpen(false);
    history.push(loginPath);
  }; 
  



  return (
    //  <PageContainer>
    <div className={styles.container}>
      {/* <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div> */}
      <div className={styles.content}>

      <Modal
        title={intl.formatMessage({id:'pages.passwordReset.title' })}
        centered
        closable
        width={300}
        open={open}
        //onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[]}        
      >

        <ProForm
          onFinish={async (values: API.ResetPasswordParams) => {
            await handlePasswordReset(values as API.ResetPasswordParams );
          }}
          formRef={formRef}
          formKey="resetpassword-form"
          layout = "vertical"
          size = "small"
          autoFocusFirstInput
        >

          <ProForm.Group>
          <ProFormText.Password
              name="password1"
              placeholder={intl.formatMessage({id:'pages.passwordReset.password1.placeholder' })}
              fieldProps={{
                //size: 'medium',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({id:'pages.passwordReset.password1.required' }),
                },
              ]}
            />              
            <ProFormText.Password
              name="password2"
              placeholder={intl.formatMessage({ id: 'pages.passwordReset.password2.placeholder' })}
              fieldProps={{
                //size: 'medium',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({id:'pages.passwordReset.password2.required' }),
                },
              ]}
            />            

            
          </ProForm.Group>
        </ProForm>

      </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordReset;