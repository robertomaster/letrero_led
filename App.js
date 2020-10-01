import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Button,
  TextInput,
  HelperText,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import Config from './Config';
import {validate} from './validate';
import {useNavigation} from '@react-navigation/native';

function HomeScreen({navigation}) {
  const uno = require('./78b36d8c7f3795b2ee53029ffb24d8de.gif');
  const dos = require('./13949193366aea90d2115e5782d76b13.gif');
  const tres = require('./a90a31400855b3067e15d2bdd663973e.gif');
  const cuatro = require('./DampGoodnaturedAurochs-small.gif');
  const [textos, setText] = React.useState({
    texto: '',
    error: '',
    negocio: '',
    errorn: '',
  });
  const navigate = useNavigation();

  const [fondo, setFondo] = React.useState(uno);

  const [contador, setContador] = React.useState(0);

  const cambioImagen = () => {
    if (contador > 3) {
      setContador(0);
    }
    if (contador == 0) {
      setFondo(uno);
    }
    if (contador == 1) {
      setFondo(dos);
    }
    if (contador == 2) {
      setFondo(tres);
    }
    if (contador == 3) {
      setFondo(cuatro);
    }
  };

  React.useEffect(() => {
    cambioImagen();
    testSchedule();
  });

  const Separator = () => <View style={styles.separator} />;

  const constraints = {
    texto: {
      presence: {
        allowEmpty: false,
        message: 'No debe estar vacio el texto',
      },
    },
    negocio: {
      presence: {
        allowEmpty: false,
        message: 'No debe estar vacio el negocio',
      },
    },
  };

  const validateFields = (tipo, valor) => validate(tipo, valor, constraints);

  const Boton = () => {
    if (
      textos.texto !== '' &&
      textos.texto !== null &&
      textos.negocio !== '' &&
      textos.negocio !== null
    ) {
      return (
        <Button
          icon="send-circle"
          color="#6F30AA"
          mode="contained"
          onPress={() => navigate.navigate('Config', textos)}>
          Ir
        </Button>
      );
    } else {
      return (
        <Text style={styles.fuentedos}>Llene los campos para continuar</Text>
      );
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ImageBackground source={fondo} style={styles.image}>
        <Text style={styles.fuente}>MATRIZ DE LEDS</Text>
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight onPress={() => setContador(contador + 1)}>
            <Image
              style={styles.tinyLogo}
              source={require('./ventajas-de-los-leds-sobre-las-bombillas-convencionales.jpg')}
            />
          </TouchableHighlight>
        </View>
        <Separator />
        <View style={{alignItems: 'center'}}>
          <Card style={{width: 300, backgroundColor: 'transparent'}}>
            <Card.Content>
              <Paragraph
                style={{color: '#fff', fontFamily: 'Caviar_Dreams_Bold'}}>
                Ingrese los campos:
              </Paragraph>
            </Card.Content>
            <TextInput
              maxLength={40}
              placeholder="Ingrese el texto"
              autoCapitalize="characters"
              selectionColor="#FFFFFF"
              style={{
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255,0.5)',
                fontSize: 20,
              }}
              onChangeText={(text) =>
                setText({
                  ...textos,
                  texto: text,
                  error: validateFields('texto', text),
                })
              }
              error={textos.error !== '' && textos.error !== null}
              value={textos.texto}
              underlineColor="#FFFFFF"
              type="outlined"
              label="Texto"
            />

            <HelperText
              type="error"
              visible={textos.error !== '' && textos.error !== null}>
              {textos.error}
            </HelperText>
            <Separator />
            <TextInput
              style={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255,0.5)',
                fontSize: 20,
              }}
              placeholder="Ingrese nombre de su negocio"
              onChangeText={(text) =>
                setText({
                  ...textos,
                  negocio: text,
                  errorn: validateFields('negocio', text),
                })
              }
              error={textos.errorn !== '' && textos.errorn !== null}
              value={textos.negocio}
              underlineColor="#FFFFFF"
              type="outlined"
              label="Negocio"
            />
            <HelperText
              type="error"
              visible={textos.errorn !== '' && textos.errorn !== null}>
              {textos.errorn}
            </HelperText>
            <Separator />
            <Boton />
          </Card>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Principal',
            headerStyle: {
              backgroundColor: '#6F30AA',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Caviar_Dreams_Bold',
            },
          }}
        />
        <Stack.Screen
          name="Config"
          component={Config}
          options={{
            title: 'Configuración',
            headerStyle: {
              backgroundColor: '#6F30AA',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: 'Caviar_Dreams_Bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 5,
    borderBottomColor: '#6F30AA',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fuente: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Caviar_Dreams_Bold',
  },
  fuentedos: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Caviar_Dreams_Bold',
  },
  tinyLogo: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    width: 100,
    height: 100,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default App;
