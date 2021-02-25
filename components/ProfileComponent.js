import React, { Component } from 'react';
import { View, Text,StyleSheet,StatusBar } from 'react-native';
import { Icon, Image, Avatar } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// const ProfileItem = ({icon, name}) => (
//   <View style={styles.itemContainer}>
//     <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
//     <Text style={[styles.itemText, {marginLeft: icon ? 20 : 0}]}>{name}</Text>
//     <FontAwesome name="angle-right" size={26} color="#1e1e1e" onPress />
//   </View>
// );
// const LoginNavigator = createStackNavigator();
// function LoginNavigatorScreen() {
//   return (
//     <LoginNavigator.Navigator
//       initialRouteName='Menu'
//       screenOptions={{
//         headerStyle: { backgroundColor: '#512DA8' },
//         headerTintColor: '#fff',
//         headerTitleStyle: { color: '#fff' }
//       }}>
//       <LoginNavigator.Screen name='Login' component={Login} />
//     </LoginNavigator.Navigator>
//   );
// }

class Profile extends Component {
  render() {

    const {navigate} = this.props.navigation;
    return (
      <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.bodyContainer}>
        <View style={styles.userContainer}>
          <View style={styles.avatarContainer}>
          {/* <Image
            source={{ uri: baseUrl + "images/logo.jpg" }}
            style={{ margin: 10, width: 80, height: 80 }}
          /> */}
           <Avatar rounded source={{ uri: baseUrl + "images/logo.jpg" }} style={{ margin: 10, width: 80, height: 80 }}/>
          </View>
          <View style={styles.textContainer} >
          <Text style={styles.welcomeText} >Chào mừng bạn đến với TH Shop</Text>
          </View>
        </View>
        {/*  */}
        <View style={styles.divider} />
        <View style={styles.itemContainer} icon="account-plus-outline" >
        <MaterialCommunityIcons name="account-plus-outline" size={26} color="#1e1e1e" />
          <Text style={[styles.itemText, {marginLeft: 20}]} onPress={()=>navigate('Register')}>Đăng Ký</Text>
          <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
          </View>
          <View style={styles.itemContainer} icon="logout-variant" >
        <MaterialCommunityIcons name="logout-variant" size={26} color="#1e1e1e" />
          <Text style={[styles.itemText, {marginLeft: 20}]} onPress={()=>navigate('Login')}>Đăng Nhập</Text>
          <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
          </View>
          <View style={styles.divider} />
        {/* <ProfileItem icon="format-list-bulleted" name="Quản lý đơn hàng" /> */}

        <View style={styles.itemContainer} icon="cart-outline">
        <MaterialCommunityIcons name="cart-outline" size={26} color="#1e1e1e" />
        <Text style={[styles.itemText, {marginLeft: 20}]} onPress={()=>navigate('Cart')} >Sản Phẩm Đã Mua</Text>
        <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
        </View>

        {/* <ProfileItem icon="cart-outline" name="Sản phẩm đã mua" />
        <ProfileItem icon="eye-outline" name="Sản phẩm đã xem" />  */}
        
        <View style={styles.itemContainer} icon="heart-outline">
        <MaterialCommunityIcons name="heart-outline" size={26} color="#1e1e1e" />
        <Text style={[styles.itemText, {marginLeft: 20}]} onPress={()=>navigate('Favorite')}>Sản Phẩm Yêu Thích</Text>
        <FontAwesome name="angle-right" size={26} color="#1e1e1e"  />
        </View>
        
        {/* <ProfileItem icon="heart-outline" name="Sản phẩm yêu thích" onPress={()=>navigator('Favorite')}/> */}
        
        
        {/* <ProfileItem icon="bookmark-outline" name="Sản phẩm mua sau" />
        <ProfileItem icon="star-outline" name="Sản phẩm đánh giá"  />
      
        <View style={styles.divider} />
        <ProfileItem name="Ưu đãi cho chủ thẻ ngân hàng" />
      <ProfileItem name="Cài đặt" />*/}
        
        <View style={styles.divider} />
        <View style={styles.itemContainer} icon="headphones">
        <MaterialCommunityIcons name="headphones" size={26} color="#1e1e1e" />
        <Text style={[styles.itemText, {marginLeft: 20}]} onPress={()=>navigate('Favorite')} >Hỗ Trợ</Text>
        <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
        </View>
        {/* <ProfileItem icon="headphones" name="Hỗ trợ" /> */}
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  //
  userContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 22,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e88e5',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  welcomeText: {
    color: '#111111',
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
  },
  authText: {
    color: '#444444',
    fontSize: 18,
    fontWeight: '500',
  },
  //
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    fontWeight: "bold",
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
    fontSize: 15,
  },
  //
  divider: {
    height: 10,
  },
});
export default Profile;