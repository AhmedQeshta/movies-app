import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const StyledButton = ({
  onPress,
  style,
  textStyle,
  title,
}: {
  onPress: () => void;
  style?: any;
  textStyle?: any;
  title: string;
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    color: Colors.textPrimary,
    padding: 15,
    borderRadius: 5,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#f2f2f2',
  },
});

export default StyledButton;
