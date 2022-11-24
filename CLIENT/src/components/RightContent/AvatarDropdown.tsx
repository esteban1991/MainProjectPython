
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Menu, Spin } from 'antd';
import type { ItemType } from 'antd/es/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';

// Import GraphQL USER Query
import { USER } from '@/graphql/query'; // <- Do not forget to import inside brackets {}

// Import useQuery hook from Apollo Client
import { useQuery } from '@apollo/client';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  /**
   * cerrar sesión y guardar la URL actual
   */
  const loginOut = async () => {
    await outLogin();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** Este método saltará a la ubicación del parámetro de redirección*/
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s: any) => ({ ...s, currentUser: undefined }));
          //setInitialState(({ ...initialState, currentUser: undefined }));
        });
        loginOut();
        localStorage.clear(); // <- logout functionality : remove all items in local storage including JWT
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  // if (!currentUser || !currentUser.name) {
  //   return loading;
  // }
  // if (!currentUser) {
  //   return loading;
  // }

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: 'Centro personal',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Configuraciones personales',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Configuraciones',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Salir',
    },
  ];


   // Get user ID from local storage
   //const id = localStorage.getItem('id');

  //  let { loading: UserQueryLoading, error: UserQueryError, data: UserQueryData } = useQuery(USER, {
  //    variables: {
  //      id,
  //    },
  //  });

  //  if (UserQueryLoading) return loading;
  //  if (UserQueryError) console.error('An Apollo client network occured :', UserQueryError);

   // Get username from local storage
   const username = localStorage.getItem('username');

   // == No longer used, please use the logic below to return username and profile picture of user ==
   // if (!currentUser || !currentUser.name) {
   //   return loadingSpin;
   // }

   // == Return loadingSpin component only if either username or Profile Picture URL is false ==
  // if (!username || !UserQueryData.user.profpic.url) {
  //   return loading;
  // }

  // == Return loadingSpin component only if either username or Profile Picture URL is false ==
  if (!username ) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
        <Avatar size="medium" style={{ backgroundColor: 'primary' }}>{username.substring(0,1)}</Avatar>
        <span className={`${styles.name} anticon`}>{username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
