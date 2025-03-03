/* eslint-disable no-shadow */
'use strict';
/* jshint esnext: true */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {getWidth, getHeight} from '@common/index';
import styles from './styles';

import SectionHeader from './SectionHeader';
import SectionItem from './SectionItem';
import CellWall from './CellWall';

function SectionList(props) {
  const {
    data,
    sectionItem,
    sectionItemHeight,
    sectionHeader,
    sectionHeaderHeight,
    returnArrayHeight,
  } = props;

  const [arrayHeight, setArrayHeight] = useState([]);

  useEffect(() => {
    returnArrayHeight(arrayHeight);
  }, []);

  function renderList() {
    return data.map((element, index) => {
      return (
        <View
          key={index}
          onLayout={evt => {
            const {height} = evt.nativeEvent.layout;
            var arrayTemp = arrayHeight;
            arrayTemp.push(height);
            setArrayHeight(arrayTemp);
          }}
          // style={{
          //   backgroundColor:
          //     '#' + ((Math.random() * 0xffffff) << 0).toString(16),
          // }}
        >
          <SectionHeader
            index={index}
            component={sectionHeader}
            sectionHeaderHeight={sectionHeaderHeight}
            title={element[0]}
            {...props}
          />
          {renderItem(element[1])}
        </View>
      );
    });
  }

  function renderItem(list) {
    return list.map((item, index) => {
      return (
        <SectionItem
          key={index}
          component={sectionItem}
          sectionItemHeight={sectionItemHeight}
          element={item}
          {...props}
        />
      );
    });
  }
  return <View style={styles.list}>{renderList()}</View>;
}

export default function AlphabetListView(props) {
  const [arrayHeight, setArrayHeight] = useState([]);
  const [itemHeight, setItemHeight] = useState([]);
  const [index, setIndex] = useState(0);
  const [content, setContent] = useState('');
  const scroll = React.createRef();

  const {
    data,
    cell,
    cellHeight,
    sectionItem,
    sectionItemHeight,
    sectionHeader,
    sectionHeaderHeight,
  } = props;

  function ScrollTo(position) {
    if (itemHeight.length === 0) {
      updateItemHeight(arrayHeight);
    }
    let currentHeight = itemHeight[position - 1] + getHeight(5),
      char = data[position][0];
    scroll.current.scrollTo({
      y: currentHeight,
      animated: true,
    });
    setContent(char);
  }

  function renderWall(props) {
    return data.map((element, index) => {
      return (
        <CellWall
          key={index}
          index={index}
          component={cell}
          cellHeight={cellHeight}
          scrollTo={position => {
            setIndex(position);
            ScrollTo(position);
          }}
          title={element[0]}
          {...props}
        />
      );
    });
  }

  function changeHeader(e) {
    if (itemHeight.length === 0) {
      updateItemHeight(arrayHeight);
    }

    console.log('searchIndex(currentHeight): ', e.nativeEvent.contentOffset.y);
    let currentHeight = e.nativeEvent.contentOffset.y;
    var currentIndex;
    for (var i = 0; i < itemHeight.length; i++) {
      if (itemHeight[i] > currentHeight) {
        currentIndex = i;
        break;
      }
    }
    let char,
      element = data[currentIndex];
    char = element[0];
    setIndex(currentIndex);
    setContent(char);
  }

  function updateItemHeight(data) {
    let arrayTemp = itemHeight,
      length = data.length;
    arrayTemp.push(data[0]);
    for (let i = 0; i < length; i++) {
      if (i > 0 && i <= length) {
        arrayTemp.push(arrayTemp[i - 1] + data[i]);
      }
    }
    setItemHeight(arrayTemp);
  }

  return (
    <View
      style={[
        styles.container,
        {paddingRight: cellHeight ? cellHeight : getWidth(10)},
      ]}>
      {content !== '' && <Text style={styles.pinHeader}>{content}</Text>}
      <ScrollView
        onScroll={e => {
          // console.log('SCROLL TO: ', e.nativeEvent.contentOffset.y);
        }}
        onMomentumScrollEnd={e => {
          // console.log('onMomentumScrollEnd: ', e.nativeEvent.contentOffset.y);
          changeHeader(e);
        }}
        ref={scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={content !== '' && styles.scrollView}
        style={styles.scrollView}>
        <SectionList
          data={data}
          sectionItem={sectionItem}
          sectionItemHeight={sectionItemHeight}
          sectionHeader={sectionHeader}
          sectionHeaderHeight={sectionHeaderHeight}
          returnArrayHeight={data => {
            console.log('-------returnArrayHeight----------');
            setArrayHeight(data);
          }}
          {...props}
        />
      </ScrollView>
      <View style={[styles.cell, {width: cellHeight}]}>
        <TouchableOpacity style={styles.cellButton}>
          <Text style={styles.cellText}>#</Text>
        </TouchableOpacity>
        {renderWall()}
      </View>
    </View>
  );
}
