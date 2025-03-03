import {StyleSheet} from 'react-native';
import {getHeight, getWidth} from '@common/index';

const styles = StyleSheet.create({
  reviewGroupButtonStar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewButtonStar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewStarImage: {
    width: getWidth(40),
    height: getHeight(40),
    resizeMode: 'contain',
  },
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default styles;
