import React, {useEffect, useState, useCallback} from 'react';
import {Title, Button, Text, RadioButton} from 'react-native-paper';
import {
  StyleSheet,
  Alert,
  Animated,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const Config = ({route}) => {
  const ancho = Dimensions.get('window').width;
  const lonTexto = route.params.texto.length * 37;
  const lonNegocio = route.params.negocio.length * 37;
  const longitud = ancho + lonNegocio + lonTexto;

  const animated = new Animated.Value(0);
  const translateX = animated.interpolate({
    inputRange: [0, longitud],
    outputRange: [longitud / 2, -longitud / 2],
  });
  const transform = [{translateX}];
  const [count, setCount] = useState(8);
  const [col, setColor] = useState();
  const [colorTexto, setColorTexto] = useState();
  const [checked, setChecked] = React.useState('first');

  const Colores = () => {
    if (count < 1) {
      setCount(1);
    }
    if (count > 30) {
      setCount(30);
    }
    if (count > 0) {
      setColor('#68A708');
    }
    if (count > 10) {
      setColor('#CDCD2D');
    }
    if (count > 20) {
      setColor('#F11818');
    }
    if (checked == 'first') {
      setColorTexto('red');
    }
    if (checked == 'second') {
      setColorTexto('green');
    }
  };

  const animacion = () => {
    animated.setValue(0);
    Animated.timing(animated, {
      toValue: longitud,
      duration: count * 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Colores();
    animacion();
    setInterval(async () => animacion(), count * 1000);
  });

  const Separator = () => <View style={styles.separator} />;

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Title style={styles.fuente}>{route.params.negocio}</Title>
        <Text style={styles.fuente}>
          Velocidad:
          <Text
            style={{
              color: col,
            }}>
            {' '}
            {count}
          </Text>
        </Text>
        <Separator />
        <View style={{flexDirection: 'row'}}>
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
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.fuente}>Rojo</Text>
        <RadioButton
          value="first"
          color="#6F30AA"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('first')}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.fuente}>Verde</Text>
        <RadioButton
          color="#6F30AA"
          value="second"
          status={checked === 'second' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('second')}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.fuente}>Previsualización</Text>
        <Separator />
        <View
          style={{
            backgroundColor: 'black',
            width: longitud,
          }}>
          <Animated.Text
            style={{
              width: longitud,
              textAlign: 'center',
              fontSize: 50,
              color: colorTexto,
              fontFamily: 'light_led_board-7',
              transform,
            }}>
            {route.params.negocio}
            {'-'}
            {route.params.texto}
          </Animated.Text>
        </View>
        <Separator />
        <Button
          icon="cube-send"
          color="#6F30AA"
          mode="outlined"
          onPress={() => Alert.alert('Texto enviado, revise su matriz')}>
          Enviar
        </Button>
      </View>
    </PaperProvider>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 20,

  colors: {
    primary: '#6F30AA',
    accent: 'yellow',
  },
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
    fontSize: 20,
    color: 'black',
    fontFamily: 'CaviarDreams',
  },
});

export default Config;
