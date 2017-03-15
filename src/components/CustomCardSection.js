import React from 'react';
import { View } from 'react-native';

const CustomCardSection = (props, customStyle) => {
  return (
    <View style={[styles.containerStyle, props.style, customStyle]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 0,
    borderRadius: 7,
    padding: 5,
    backgroundColor: '#111111',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export default CustomCardSection;