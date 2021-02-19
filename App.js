import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SmoothPicker from 'react-native-smooth-picker';

const dataHours = [];

for (let i = 1; i <= 12; i++) {
  dataHours.push(i);
}

const dataMinutes = [];
for (let i = 1; i <= 60; i++) {
  dataMinutes.push(i);
}

const dataAmPm = [
  'AM',
  'PM'
];

const opacities = {
  0: 1,
  1: 1,
  2: 0.6,
  3: 0.3,
  4: 0.1,
};
const sizeText = {
  0: 20,
  1: 15,
  2: 10,
};

const Item = React.memo(({ opacity, selected, vertical, fontSize, name }) => {
  return (
    <View
      style={[styles.OptionWrapper, { opacity, borderColor: selected ? '#ABC9AF' : 'transparent', width: 70 }]}
    >
      <Text style={{ fontSize }}>
        {name}
      </Text>
    </View>
  );
});




const ItemToRender = ({ item, index }, indexSelected, vertical) => {
  const selected = index === indexSelected;
  const gap = Math.abs(index - indexSelected);

  let opacity = opacities[gap];
  if (gap > 3) {
    opacity = opacities[4];
  }
  let fontSize = sizeText[gap];
  if (gap > 1) {
    fontSize = sizeText[2];
  }

  return <Item opacity={opacity} selected={selected} vertical={vertical} fontSize={fontSize} name={item} />;
};

const App = () => {

  function handleChange(index) {
    setSelected(index);
    // refPicker.current.scrollToIndex({
    //   animated: false,
    //   index: index,
    //   viewOffset: -30,
    // });
  }

  const [selected, setSelected] = useState(4);
  // const refPicker = useRef(null);
  return (
    <View style={styles.container}>
      {/* <View style={styles.wrapperHorizontal}>
        <SmoothPicker
          initialScrollToIndex={selected}
          refFlatList={refPicker}
          keyExtractor={(_, index) => index.toString()}
          horizontal={true}
          scrollAnimation
          showsHorizontalScrollIndicator={false}
          data={dataHours}
          renderItem={option => ItemToRender(option, selected, false)}
        />
      </View> */}
      <View style={styles.wrapperVertical}>
        <SmoothPicker
          initialScrollToIndex={selected}
          onScrollToIndexFailed={() => { }}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={dataHours}
          // scrollAnimation
          onSelected={({ item, index }) => handleChange(index)}
          renderItem={option => ItemToRender(option, selected, true)}
          magnet
        />
      </View>
      <View style={styles.wrapperVertical}>
        <SmoothPicker
          initialScrollToIndex={selected}
          onScrollToIndexFailed={() => { }}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={dataMinutes}
          // scrollAnimation
          onSelected={({ item, index }) => handleChange(index)}
          renderItem={option => ItemToRender(option, selected, true)}
          magnet
        />
      </View>
      <View style={styles.wrapperVertical}>
        <SmoothPicker
          initialScrollToIndex={selected}
          onScrollToIndexFailed={() => { }}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={dataAmPm}
          // scrollAnimation
          onSelected={({ item, index }) => handleChange(index)}
          renderItem={option => ItemToRender(option, selected, true)}
          magnet
        />
      </View>
      {/* <View>
        <Text>{`Your selection is ${dataHours[selected]}`}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // paddingTop: 60,
    // paddingBottom: 30,
    // flex: 1,
    // flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  wrapperVertical: {
    // width: 250,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    color: 'black',
  },
  OptionWrapper: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});

export default App;
