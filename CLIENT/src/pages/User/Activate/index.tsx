import Footer from '@/components/Footer';


import { message } from 'antd';
import React from 'react';
import styles from './index.less';

// Import GraphQL ACTIVATE mutation
import {ACTIVATE} from '@/graphql/mutation'; // <- Do not forget to import inside brackets {}


// Import useMutation hook from Apollo Client
import { useMutation } from '@apollo/client';

import { history, useIntl, useModel } from '@umijs/max';

const Activate: React.FC = () => {

const [activateUser] = useMutation(ACTIVATE);
const loginPath = '/user/login';
const intl = useIntl();

const handleActivate = async () => {
    try {
      const tokenParam = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
      console.log('TOKEN ESSSS'+ tokenParam);
      // Activate
      const { data, errors } = await activateUser({
        variables: {
          token:  tokenParam,
        },
      });        

      if (!errors && data.verifyAccount.success ) {
        const defaultActivateSuccessMessage = intl.formatMessage({
            id: 'pages.activate.success',
        });          
        message.success(defaultActivateSuccessMessage);
        return;
      } else {
        const listerror = data.verifyAccount.errors.nonFieldErrors;
        const msgerror = listerror && listerror[0].code; 
          
        const defaultActivateFailure = intl.formatMessage({
          id: msgerror === 'already_verified' ? 
            'pages.activate.already_verified' : 
            'pages.activate.invalid_token',
        });

        const defaultActivateFailureServer = intl.formatMessage({
          id: 'pages.activate.failureServer',
        });          

        message.error(errors ? defaultActivateFailureServer : defaultActivateFailure );
      }
    } catch (error) {
      const defaultActivateFailureMessage = intl.formatMessage({
        id: 'pages.activate.failureServer',
      });
      message.error(defaultActivateFailureMessage + error);
    }
    finally
    {
      history.push(loginPath);
    }
    
};

  React.useEffect(() => {

    handleActivate();
   

  }, [])


  return (
    <div className={styles.container}>
      <div className={styles.content}>
      </div>
      <Footer />
    </div>
  );
};

export default Activate;
