import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import CartContext from './context/CartContext'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import CartRoute from './components/CartRoute'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

const App = () => {
  const [cartList, setCartList] = useState([])

  const removeAllCartItems = () => {
    setCartList([])
  }

  const addCartItem = dish => {
    setCartList(prevList => {
      const existingItem = prevList.find(item => item.dishId === dish.dishId)
      if (existingItem) {
        return prevList.map(item => {
          if (item.dishId === dish.dishId) {
            return { ...item, quantity: item.quantity + dish.quantity }
          }
          return item
        })
      }
      return [...prevList, dish]
    })
  }

  const removeCartItem = dishId => {
    setCartList(prevList => prevList.filter(item => item.dishId !== dishId))
  }

  const incrementCartItemQuantity = dishId => {
    setCartList(prevList =>
      prevList.map(item => {
        if (item.dishId === dishId) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevList =>
      prevList
        .map(item => {
          if (item.dishId === dishId) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        })
        .filter(item => item.quantity > 0)
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartRoute />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartContext.Provider>
  )
}

export default App
