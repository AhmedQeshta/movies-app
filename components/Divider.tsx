import { View } from 'react-native';

const Divider = ({ style }: { style?: any }) => {
  return (
    <View
      style={{
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginVertical: 20,
        width: '80%',
        ...style,
      }}
    />
  );
};

export default Divider;
