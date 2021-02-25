import React, { Component } from "react";
import { FlatList, Text, Alert } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import Loading from "./LoadingComponent";
import Swipeout from "react-native-swipeout";
import { baseUrl } from "../shared/baseUrl";
import * as Animatable from "react-native-animatable";
// redux
import { connect } from "react-redux";
import { deleteCart } from "../redux/ActionCreators";
const mapStateToProps = (state) => {
  return {
    products: state.products,
    carts: state.carts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteCart: (productId) => dispatch(deleteCart(productId)),
});

class Carts extends Component {
  render() {
    if (this.props.products.isLoading) {
      return <Loading />;
    } else if (this.props.products.errMess) {
      return <Text>{this.props.products.errMess}</Text>;
    } else {
      const products = this.props.products.products.filter((product) =>
        this.props.carts.some((el) => el === product.id)
      );
      return (
        <FlatList
          data={products}
          renderItem={({ item, index }) => this.renderMenuItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />

      );
    }
  }
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    const rightButton = [
      {
        text: "Delete",
        type: "delete",
        onPress: () => {
          Alert.alert(
            "Xóa sản phẩm khỏi giỏ hàng?",
            "Bạn muốn xóa " +
              item.name +
              "?",
            [
              {
                text: "Không",
                onPress: () => {
                  /* nothing */
                },
              },
              { text: "Đồng Ý", onPress: () => this.props.deleteCart(item.id) },
            ],
            { cancelable: false }
          );
        },
      },
    ];
    return (
      <Swipeout right={rightButton} autoClose={true}>
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <ListItem
            key={index}
            onPress={() => navigate("Dishdetail", { productId: item.id })}
          >
            <Avatar source={{ uri: baseUrl + item.image }} />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </Animatable.View>
      </Swipeout>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Carts);