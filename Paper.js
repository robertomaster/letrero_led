import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

const Paper = () => {
  const [count, setCount] = useState(0);
  const [col, setColor] = useState();
  if (count < 0) {
    setCount(30);
  }
  if (count > 30) {
    setCount(0);
  }
  const Colores = () => {
    if (count > 0) {
      setColor('#68A708');
    }
    if (count > 10) {
      setColor('#CDCD2D');
    }
    if (count > 20) {
      setColor('#F11818');
    }
  };
  useEffect(() => {
    Colores();
  });

  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Text style={styles.fuente}>
        El número es:
        <Text
          style={{
            color: col,
          }}>
          {' '}
          {count}
        </Text>
      </Text>
      <Separator />
      <Button
        icon="plus"
        color="#6F30AA"
        mode="outlined"
        onPress={() => setCount(count + 1)}>
        1
      </Button>
      <Separator />
      <Button
        icon="minus"
        mode="contained"
        color="#6F30AA"
        onPress={() => setCount(count - 1)}>
        1
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    borderBottomColor: '#6F30AA',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fuente: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    fontFamily: 'CaviarDreams',
  },
});

export default Paper;
