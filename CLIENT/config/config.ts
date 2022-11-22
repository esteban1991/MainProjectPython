// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  /**
   * @name Habilitar modo hash
   * @description Haga que el producto después de la compilación contenga el sufijo hash.
   * Normalmente se utiliza para la publicación incremental y para evitar el almacenamiento en caché de la carga del navegador.
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @name Configuración de compatibilidad
   * @description La configuración de ie11 puede no ser perfectamente compatible, debe verificar todas las dependencias que usa
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },
  /**
   * @name La configuración de la ruta, los archivos que no se importen en la ruta no se compilarán
   * @description Solo admite la configuración de ruta, componente, rutas, redirección, envoltorios, título
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name Configuración del tema
   * @description Aunque se llama tema, en realidad es solo una configuración variable de menos
   * @doc antd configuración del tema https://ant.design/docs/react/customize-theme-cn
   * @doc configuración del tema de umi https://umijs.org/docs/api/config#theme
   */
  theme: {
    // Si no desea que configProvide configure dinámicamente el tema, debe configurarlo como predeterminado
    // Solo establecido en variable, puede usar configProvide para establecer dinámicamente el color principal
    'root-entry-name': 'variable',
  },
  /**
   * @name moment configuración de internacionalización
   * @description Si no hay requisitos para la internacionalización, el tamaño del paquete de js se puede reducir después de abrir
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name configuración de proxy
   * @description Permite que su servidor local actúe como proxy de su servidor para que pueda acceder a los datos del servidor
   * @see Tenga en cuenta que los siguientes proxies solo se pueden usar durante el desarrollo local y no se pueden usar después de la compilación.
   * @doc Introducción del agente https://umijs.org/docs/guides/proxy
   * @doc configuración de proxy https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV || 'dev'],
  /**
   * @name Configuración rápida de actualización en caliente
   * @description Un buen componente de actualización en caliente que conserva el estado al actualizar
   */
  fastRefresh: true,
  //============== La siguiente es la configuración del complemento de max ===============
  /**
   * @name Complemento de flujo de datos
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * Un flujo de datos inicial global que se puede usar para compartir datos entre complementos
   * @description Se puede usar para almacenar algunos datos globales, como información del usuario,
   * o algún estado global.El estado inicial global se crea al comienzo de todo el proyecto Umi.
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name layout complemento de diseño
   * @doc https://umijs.org/docs/max/layout-menu
   */
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name Complemento de internacionalización
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default zh-CN
    default: 'es-ES',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  /**
   * @name antd 插件
   * @description 内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name 网络请求配置
   * @description 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name 权限插件
   * @description 基于 initialState 的权限插件，必须先打开 initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  //================ pro 插件配置 =================
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI 插件的配置
   * @description 基于 openapi 的规范生成serve 和mock，能减少很多样板代码
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    exclude :['@playwright/test']
  },
});
