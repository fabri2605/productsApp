import React, {useEffect, useState, useContext} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {ProductsCtx} from '../context/ProductsContext';
import {styles} from '../theme/Theme';
import {ProductStackParams} from '../navigation/ProdStackNav';
import {useForm} from '../hooks/useForm';
import {getColorImage} from '../components/getColorImage';
import {context} from '../context/posterContext';
import {GradientView} from '../components/GradientView';
import {ScrollView} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<ProductStackParams, 'NewProduct'> {}

export const NewProduct = ({navigation, route}: Props) => {
  const {id = '', nombre = ''} = route.params;
  const {
    cathegorys,
    loadProductById,
    updateProduct,
    addProduct,
    error,
    clearError,
    deleteProduct,
    uploadImg,
  } = useContext(ProductsCtx);
  const [loading, setLoading] = useState(true);
  const [imageTaken, setImageTaken] = useState<string>('');

  const {changeColors} = useContext(context);

  const {action, setFormValues, _id, img, cathegory, name} = useForm({
    _id: id,
    name: nombre,
    cathegory: '',
    img: '',
  });

  const openCamera = async () => {
    await launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
        cameraType: 'back',
      },
      res => {
        if (res.didCancel) return;
        if (!res.assets) return;
        setImageTaken(res.assets[0].uri!);
        uploadImg(_id, res.assets[0]);
      },
    );
  };

  const openGallery = async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      res => {
        if (res.didCancel) return;
        if (!res.assets) return;
        setImageTaken(res.assets[0].uri!);
        uploadImg(_id, res.assets[0]);
      },
    );
  };

  const updateHandler = async () => {
    setLoading(true);

    if (!name) {
      return clearError('Ingrese un nombre!');
    }

    let cateId: string = '';
    if (cathegory.length === 0) {
      cateId = cathegorys![0]._id;
    } else {
      cateId = cathegory;
    }

    if (id) {
      await updateProduct(cateId, name, id);
    } else {
      await addProduct(cateId, name);
    }
    Alert.alert('Correct!', 'Product updated correctly..');
    navigation.pop();
  };
  //done
  const deleteHandler = async () => {
    setLoading(true);
    await deleteProduct(id);
    navigation.pop();
  };

  const getBGColor = async (index: string) => {
    const uri = index;

    const {primary = 'green', secondary = 'orange'} = await getColorImage(uri);
    changeColors(primary, secondary);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: nombre ? nombre : 'New Product',
    });
  }, [nombre]);

  useEffect(() => {
    const bringingInfo = async () => {
      if (id) {
        const p = await loadProductById(id);
        setFormValues({
          _id: p._id,
          name: p.nombre,
          img: p.img ? p.img : '',
          cathegory: p.categoria._id,
        });
      }
      setLoading(false);
    };
    bringingInfo();
  }, []);

  useEffect(() => {
    if (img || imageTaken) {
      let a = img ? img : imageTaken;
      getBGColor(a);
    }
  }, [img, imageTaken]);

  if (loading)
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator color={'black'} size={30} />
      </View>
    );

  return (
    <GradientView>
      <ScrollView>
        <View style={{flex: 1, marginHorizontal: 20}}>
          <Text style={sty.txt}>Nombre del Producto</Text>
          <TextInput
            placeholderTextColor={'grey'}
            placeholder="Producto"
            value={name}
            style={sty.input}
            onChangeText={e => {
              action('name', e);
            }}
          />
          <Text style={{...sty.txt, marginBottom: 10}}>Categoria</Text>
          <Picker
            enabled={!!cathegorys}
            mode={'dropdown'}
            style={sty.picker}
            selectedValue={cathegory}
            onValueChange={(itemValue, itemIndex) =>
              action('cathegory', itemValue)
            }>
            {cathegorys ? (
              cathegorys.map(c => {
                return (
                  <Picker.Item key={c._id} label={c.nombre} value={c._id} />
                );
              })
            ) : (
              <Picker.Item label={'No cathegorys available..'} value={0} />
            )}
          </Picker>

          <Text>&nbsp;</Text>

          <Button
            onPress={() => updateHandler()}
            color={'purple'}
            title="SAVE"
          />
          {error && <Text style={sty.error}>{error}</Text>}

          {id && (
            <View style={sty.container}>
              <Button onPress={openCamera} color={'purple'} title="Camera" />
              <Button onPress={openGallery} color={'purple'} title="Galery" />
              <Button
                onPress={() => deleteHandler()}
                color={'#bf1e62'}
                title="Delete"
              />
            </View>
          )}
          {img && !imageTaken && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={sty.img} source={{uri: img}} />
            </View>
          )}
          {imageTaken && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={sty.img} source={{uri: imageTaken}} />
            </View>
          )}
        </View>
      </ScrollView>
    </GradientView>
  );
};

const sty = StyleSheet.create({
  txt: {
    color: 'black',
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10,
    marginVertical: 10,
    height: 45,
    color: 'black',
    paddingHorizontal: 10,
  },
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  picker: {
    backgroundColor: 'black',
    borderRadius: 40,
  },
  img: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  error: {
    color: 'red',
    margin: 5,
    fontSize: 15,
  },
});
