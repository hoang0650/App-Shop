import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, View, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loading from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';
// redux
import { connect } from 'react-redux';
//animtion 
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
const mapStateToProps = state => {
  return {
    products: state.products
  }
};

class Menu extends Component {
  render() {
      if (this.props.products.isLoading) {
        return (<Loading />);
      } else if (this.props.products.errMess) {
        return (<Text>{this.props.errMess}</Text>);
      } else {
        return (
        <ScrollView>
          <Text style={styles.sectionTitle}>Tất Cả</Text>
      {/*  */}  
          <FlatList horizontal={true} data={this.props.products.products}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={item => item.id.toString()} />
          <Text style={styles.sectionTitle}>Quần - Áo</Text>
      {/*  */}
          <FlatList horizontal={true} data={this.props.products.products}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={item => item.id.toString()} />
          <Text style={styles.sectionTitle}>Thiết Bị Công Nghệ</Text>
      {/*  */}
          <FlatList horizontal={true} data={this.props.products.products}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={item => item.id.toString()} />
          </ScrollView>
          
        );
      }
    }
  renderMenuItem(item, index) {
    const {navigate} = this.props.navigation;
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <ListItem key={index} onPress={() => navigate('Productdetail', { productId: item.id })}>
         {/* <Avatar source={{uri: baseUrl + item.image}} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
        <Text style={styles.itemPrice}>{item.price}$</Text> */}
         <View style={styles.itemContainer}>
           <Image source={{uri: baseUrl + item.image}} style={styles.itemImage}/>
           <Text style={styles.itemName} numberOfLines={2}>
             {item.name}
           </Text>
           <Text style={styles.itemPrice}>{item.price}$</Text>
         </View>
      </ListItem>

      </Animatable.View>
    );
  };
}
export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2f2f2f',
    marginVertical: 12,
  },
  itemContainer: {
    width: 100,
    marginRight: 12,
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemName: {
    fontSize: 14,
    color: '#484848',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2a2a2a',
  },
  //
  seeMoreContainer: {
    marginTop: 10,
    padding: 12,
    borderTopWidth: 0.6,
    borderTopColor: '#ededed',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#0e45b4',
  },
});