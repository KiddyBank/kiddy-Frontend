import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Images} from '@config';
import styles from './styles';

const Rating = ({
  number,
  active,
  style,
  onChangeValue,
  disabled,
  stylesRating,
}) => {
  const [numberStar, setNumberStar] = useState(5);
  const [activeStar, setActiveStar] = useState(0);

  useEffect(() => {
    setNumberStar(number);
  }, [number]);

  useEffect(() => {
    setActiveStar(active);
  }, [active]);

  const changeActiveStar = index => {
    setActiveStar(index);
    typeof onChangeValue !== 'undefined' && onChangeValue(index);
  };

  const renderStar = () => {
    let listStar = [];
    for (let index = 1; index <= numberStar; index++) {
      listStar.push(
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          onPress={() => {
            changeActiveStar(index);
          }}>
          <Image
            style={[styles.reviewStarImage, stylesRating]}
            source={
              index <= activeStar
                ? Images.ic_star_active
                : Images.ic_star_inactive
            }
          />
        </TouchableOpacity>,
      );
    }
    return listStar;
  };
  return (
    <View
      style={[styles.ratingContainer, style]}
      pointerEvents={disabled ? 'none' : 'auto'}>
      {renderStar()}
    </View>
  );
};

export default Rating;
