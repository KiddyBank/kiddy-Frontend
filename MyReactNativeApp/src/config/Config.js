/**
 * Config environment
 * @author dattd
 * @since 2020
 * @version 1.0.0
 */
export const Config = {
  fcm_token: null,
  timeout: 120000,
  base_url: null,
  base_url_api: () => {
    return Config.base_url + 'api/';
  },
  access_token: null,
  lang_code: 'vi',
  //Key lưu async storage
  storage: {
    base_url: 'base_url',
    access_token: 'access_token',
    fcm_token: 'fcm_token',
  },
};
