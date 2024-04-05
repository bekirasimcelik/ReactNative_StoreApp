import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, ActivityIndicator, Text} from 'react-native';
import {API_URL} from '@env';
//import Config from 'react-native-config';

import ProductCard from '../../components/ProductCard';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {data: productData} = await axios.get(API_URL);
      setData(productData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const renderProduct = ({item}) => <ProductCard product={item} />;

  if (loading) {
    return <ActivityIndicator size={'large'} />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <SafeAreaView>
      <FlatList data={data} renderItem={renderProduct} />
    </SafeAreaView>
  );
};

export default Products;
