import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from '../theme/Theme';
import {ProductsCtx} from '../context/ProductsContext';
import {ProdListComp} from '../components/ProdListComp';
import {ProductStackParams} from '../navigation/ProdStackNav';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<ProductStackParams, 'Products'> {}

export const ItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginTop: 5,
      }}
    />
  );
};

export const Products = ({navigation}: Props) => {
  const {loadProducts, products} = useContext(ProductsCtx);
  const {logOut} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [refresh, setRef] = useState(false);

  /* navigation.navigate('Product', {id: p._id, name: p.nombre}); */

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('NewProduct', {id: '', nombre: ''})}>
          <Text style={{color: 'black', marginRight: 20}}>Add Product</Text>
        </TouchableOpacity>
      ),
      headerShown: true,
    });
    loadProducts().then(() => setLoading(false));
  }, []);

  const pressHandler = (id: string, nombre: string) => {
    navigation.navigate('NewProduct', {id, nombre});
  };

  const onRefresh = React.useCallback( async() => {
    setRef(true);
    await loadProducts();
    setRef(false);
  }, []);

  if (loading)
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator color={'black'} size={30} />
      </View>
    );

  return (
    <View
      style={{...styles.globalMargin, flex: 1, height: 600}}>
      {products ? (
        <FlatList
          data={products}
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={()=>{onRefresh()}} />}
          renderItem={({item}) => (
            <ProdListComp
              element={item}
              onPress={() => pressHandler(item._id, item.nombre)}
            />
          )}
          ItemSeparatorComponent={() => <ItemSeparator />}
          keyExtractor={p => p._id}
        />
      ) : (
        <Text style={styles.errorTxt}>There are no products available</Text>
      )}
      <TouchableOpacity style={{alignSelf: 'flex-end', marginBottom: 20}} onPress={logOut}>
        <Text style={{color: 'black'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
