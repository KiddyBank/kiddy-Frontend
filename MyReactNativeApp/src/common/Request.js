import axios from 'axios';
import {Config} from '@config';
import Toast from 'react-native-simple-toast';
import {lang} from '@assets/language/i18n';
export const Request = {
  async header() {
    let header_data = {
      'Content-Type': 'application/json',
      'lang-code': Config.lang_code,
    };
    let token = {
      'x-token': Config.access_token,
    };
    if (Config.access_token != null) {
      header_data = {...header_data, ...token};
    }
    return await axios.create({
      baseURL: Config.base_url_api(),
      timeout: Config.timeout,
      headers: header_data,
    });
  },

  async get(url) {
    return new Promise(async (rs, rj) => {
      try {
        let header = await this.header();
        rs(await header.get(url));
      } catch (error) {
        Toast.show(lang('general.error'));
      }
    });
  },

  async post(url, json) {
    return new Promise(async (rs, rj) => {
      try {
        let header = await this.header();
        rs(await header.post(url, json));
      } catch (error) {
        Toast.show(lang('general.error'));
      }
    });
  },
};
