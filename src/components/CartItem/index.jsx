import { FaTrashAlt } from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = ({ cartItemDetails }) => {
  const { dishId, dishName, dishPrice, dishCurrency, dishImage, quantity } = cartItemDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const onClickIncrement = () => {
          incrementCartItemQuantity(dishId)
        }

        const onClickDecrement = () => {
          decrementCartItemQuantity(dishId)
        }

        const onClickRemove = () => {
          removeCartItem(dishId)
        }

        const totalPrice = (dishPrice * quantity).toFixed(2)

        return (
          <li className="cart-item">
            <img src={dishImage} alt={dishName} className="cart-product-image" />

            <div className="cart-item-details-container">
              <h4 className="cart-product-title">{dishName}</h4>

              <div className="cart-quantity-container">
                <button
                  type="button"
                  className="cart-quantity-btn"
                  onClick={onClickDecrement}
                >
                  -
                </button>
                <span className="cart-quantity-text">{quantity}</span>
                <button
                  type="button"
                  className="cart-quantity-btn"
                  onClick={onClickIncrement}
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-item-price-remove-container">
              <p className="cart-total-price">
                {dishCurrency} {totalPrice}
              </p>
              <button
                type="button"
                className="cart-remove-btn"
                onClick={onClickRemove}
                aria-label="Remove item"
              >
                <FaTrashAlt className="remove-icon" />
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
