import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, PanResponder, Alert } from 'react-native';
import { Card ,Image, Icon, Input, Rating } from 'react-native-elements';
// redux
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite, postComment, postCart } from '../redux/ActionCreators';
//animation
import * as Animatable from 'react-native-animatable';
import {comments} from '../redux/comments';
const mapStateToProps = state => {
  return {
    products: state.products,
    comments: state.comments,
    favorites: state.favorites,
    carts: state.carts,
  }
};
const mapDispatchToProps = dispatch => ({
  postFavorite: (productId) => dispatch(postFavorite(productId)),
  postCart: (productId) => dispatch(postCart(productId)),
  postComment: (productId, rating, author, comment) =>
    dispatch(postComment(productId, rating, author, comment))
});

class RenderDish extends Component {
  render() {
    // gesture
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -200) return true; // right to left
      return false;
    };
    const recognizeComment = ({ dx }) => {
      if (dx > 200) return true; // Left to right
      return false;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => { return true; },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState)) {
          Alert.alert(
            "Thêm vào yêu thích",
          "Bạn có muố thêm món  " + product.name + " vào danh sách món yêu thích?",
          [
            {
              text: "Cancel",
              onPress: () => {
                /* nothing */
              },
            },
            {
              text: "OK",
              onPress: () =>
                this.props.favorite ? alert("Đã thêm món này vào yêu thích") : this.props.onPress(),
            },
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        this.props.onPressAddComment();
      }
        return true;
      }
    });
      const product = this.props.product;
      if (product != null) {
        return (
          <Card {...panResponder.panHandlers}> 
            <Image source={{ uri: baseUrl + product.image }} style={{ width: '100%', height: 100, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Card.FeaturedTitle>{product.name}</Card.FeaturedTitle>
            </Image>
            <Text style={{ margin: 10 }} >{product.description}</Text>
              <View style={styles.icons}>
              <Icon raised reverse type='font-awesome' color='#FF0000'
                name={this.props.favorite ? 'heart' : 'heart-o'} 
                onPress={() => this.props.favorite ? alert('Sản phẩm này đã nằm trong Sản phẩm yêu thícg của bạn.') : this.props.onPressFavorite()} />
              <Icon raised reverse type="font-awesome" name="pencil"  color="#363636"
                onPress={this.props.onPressAddComment}/>
               <Icon raised reverse 
                name={this.props.cart ? "shopping-cart" : "shopping-cart"} type="font-awesome" color="#363636" 
                onPress={() => this.props.cart ? alert("Sản phẩm này đã nằm trong giỏ hàng của bạn") : this.props.onPressAddToCart()
            }
          />
              </View>
              <Text style={styles.itemPrice}>{product.price}$</Text>
          </Card>
        );
      }
      return (<View />);
    }
  }

class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={item => item.id.toString()} />
      </Card>
      );
    }
  renderCommentItem(item, index) {
      return (
        <View key={index} style={{ margin: 10 }}>
          <Text style={{ fontSize: 14 }}>{item.comment}</Text>
          <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
          <Rating imageSize={15} readonly startingValue={item.rating} style={{ alignItems: "flex-start" }}/>
          <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
        </View>
      );
    };
  }

class Productdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      showModal: false,
      author: "",
      comment: "",
      rating: 5
    };
  }

  markFavorite(productId) {
    this.props.postFavorite(productId);
  }
  addToCart(productId) {
    this.props.postCart(productId);
  }
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  ratingCompleted = rating => {
    this.setState({ rating });
  };

  handleAuthorInput = author => {
    this.setState({ author });
  };

  handleCommentInput = comment => {
    this.setState({ comment });
  };

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
      showModal: false
    });
  }

  handleComment() {
    const { rating, author, comment } = this.state;
    const productId = parseInt(this.props.route.params.productId);

    this.toggleModal();
    this.props.postComment(productId, rating, author, comment);
  }

  render() {
      const productId = parseInt(this.props.route.params.productId);
      const product = this.props.products.products[productId];
      const comment = this.props.comments.comments.filter(comment => comment.productId === productId);
      const favorite = this.props.favorites.some((el) => el === productId);
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <RenderDish product={product} favorite={favorite} onPressFavorite ={() => this.markFavorite(productId)} onPressAddComment={this.toggleModal}
        cart={this.props.carts.some((el) => el === productId)} onPressAddToCart={()=>this.addToCart(productId)}
        />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <RenderComments comments = {comment}/>
        </Animatable.View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              imageSize={30}
              startingValue={5}
              showRating
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder="Author"
              onChangeText={this.handleAuthorInput}
              leftIcon={{ type: "font-awesome", name: "user-o" }}
            />
            <Input
              placeholder="Comment"
              onChangeText={this.handleCommentInput}
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
            />
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.handleComment();
                  this.resetForm();
                }}
                color="#512DA8"
                title="Submit"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="gray"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icons: {
    // alignItems: "center",
    justifyContent: "center",
    // flex: 1,
    flexDirection: "row"
  },
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: "center",
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20
  },
  itemPrice: {
    fontSize: 25,
    fontWeight: "bold",
    fontWeight: '500',
    color: '#2a2a2a',
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Productdetail);