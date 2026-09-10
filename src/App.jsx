import { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import CartContext from './context/CartContext'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import CartRoute from './components/CartRoute'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({ cartList: [] })
  }

  addCartItem = dish => {
    const { cartList } = this.state
    const dishObject = cartList.find(eachCartItem => eachCartItem.dishId === dish.dishId)

    if (dishObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (dishObject.dishId === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.quantity + dish.quantity
            return { ...eachCartItem, quantity: updatedQuantity }
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, dish]
      this.setState({ cartList: updatedCartList })
    }
  }

  removeCartItem = dishId => {
    const { cartList } = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.dishId !== dishId
    )
    this.setState({ cartList: updatedCartList })
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (dishId === eachCartItem.dishId) {
          const updatedQuantity = eachCartItem.quantity + 1
          return { ...eachCartItem, quantity: updatedQuantity }
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = dishId => {
    const { cartList } = this.state
    const dishObject = cartList.find(eachCartItem => eachCartItem.dishId === dishId)
    if (dishObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (dishId === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.quantity - 1
            return { ...eachCartItem, quantity: updatedQuantity }
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(dishId)
    }
  }

  render() {
    const { cartList } = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/cart" component={CartRoute} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
