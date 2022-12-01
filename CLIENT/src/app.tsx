import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
//import { PageLoading } from '@ant-design/pro-layout';
import { errorConfig } from './requestErrorConfig';
import { currentUser, currentUser as queryCurrentUser } from './services/ant-design-pro/api';

import appConfig from './appConfig.json';
import type { JwtPayload } from 'jwt-decode';
import jwt_decode from 'jwt-decode';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Swal from 'sweetalert2';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

// /** 获取用户信息比较慢的时候会展示一个 loading */
// export const initialStateConfig = {
//   loading: <PageLoading />,
// };

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  // const fetchUserInfo = async () => {
  //   try {
  //     const msg = await queryCurrentUser({
  //       skipErrorHandler: true,
  //     });
  //     return msg.data;
  //   } catch (error) {
  //     history.push(loginPath);
  //   }
  //   return undefined;
  // };
  const fetchUserInfo = async () => {
    try {
      // const currentUser = await queryCurrentUser();
      // return currentUser;

      const userId = localStorage.getItem('id');
      const userName = localStorage.getItem('username');

      if (userId == null) {
        return undefined;
      } else {
        let currentUser: API.CurrentUser = { userid: userId, name: String(userName) };
        return currentUser;
      }
    } catch (error) {
      console.info('Current User is undefined :', error);
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (window.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();

    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  //console.log(currentUser)
  //console.log(Settings)
  return {
    fetchUserInfo,
    
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {




  return {
    rightContentRender: () => <RightContent />,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history;
      // // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
      const { location } = history;
      // If you are not logged in, redirect to login screen
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }

      const token = localStorage.getItem('token');

      if (location.pathname === loginPath) {
        console.info('You are on Login screen');

        if (token != null) {
          // Redirect logged in users to '/' if they visit Login screen.
          history.push('/');
        }
      } else {
        if (token != null) {
          let decoded: JwtPayload;

          // Handle a token which is created intentionally (Invalid JWT)
          try {
            // Decode token
            decoded = jwt_decode<JwtPayload>(token);
          } catch (error) {
            console.error('Invalid token, please login');
            localStorage.removeItem('token');
            history.push(loginPath);
            return;
          }

          if (decoded!.exp != undefined) {
            // Get Current UTC Time
            const utcTime = Math.floor(Date.now() / 1000);

            if (utcTime < decoded!.exp) {
              // If token is not expired, stay in the current screen
              console.info('You are logged in');
            } else {
              console.error('Your token has expired, please login again');

              // Give an alert to user to login again
              Swal.fire({
                icon: 'info',
                title: 'You have been inactive for a while...',
                text: 'Please login again',
              });

              localStorage.clear();
              history.push(loginPath);
            }
          } else {
            console.log('Token seems to be invalid, please Login again!');

            Swal.fire({
              icon: 'error',
              title: 'Something went wrong',
              text: 'Please login!',
            });

            localStorage.clear();
            history.push(loginPath);
          }
        } else {
          console.log('You have not logged in, Login first!');

          // Ask users to login first before visitng other pages
          history.push(loginPath);
        }
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],

    title : localStorage.getItem('company') || 'Core Client' ,
    logo : '/logos/' + localStorage.getItem('username') + '.svg' ,
    primaryColor: localStorage.getItem('colorprimary') || '#1890ff',
    navTheme: localStorage.getItem('navtheme') || 'realDark',

    // menuHeaderRender: undefined,
    // // 自定义 403 页面
    // // unAccessible: <div>unAccessible</div>,
    // // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[]; }; }) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              // enableDarkTheme={false}
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },


    ...initialState?.settings,
  };
};



// == This 'httpLink' does not allow to upload a file ==
// const httpLink = createHttpLink({
//   uri: appConfig.graphqlUri,
// });

// == Modified 'httpLink' so it is able to upload a file ==
const httpLink = createUploadLink({
  uri: appConfig.graphqlUri,
});

const authLink = setContext((_, { headers }) => {
  // Get JWT from localStorage if exists
  const token = localStorage.getItem('token');

  // return header to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink as any) as any,
  cache: new InMemoryCache(),
});

export function rootContainer(container: React.Component) {
  return <ApolloProvider client={client}>{container}</ApolloProvider>;
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
