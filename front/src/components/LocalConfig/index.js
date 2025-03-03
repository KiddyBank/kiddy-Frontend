import {LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['vi'] = {
  monthNames:
    'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split(
      '_',
    ),
  monthNamesShort:
    'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
  monthsParseExact: true,
  dayNames: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
  dayNamesShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  today: 'Hôm nay',
};
export default LocaleConfig;
