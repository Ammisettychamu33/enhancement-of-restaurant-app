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

        const totalPrice = dishPrice * quantity

        return (
          <li className="cart-item">
            <img src={dishImage} alt={dishName} className="cart-product-image" />

            <div className="cart-item-details-container">
              <p className="cart-product-title">{dishName}</p>

              <div className="cart-quantity-container">
                <button
                  type="button"
                  className="cart-quantity-btn"
                  onClick={onClickDecrement}
                >
                  -
                </button>
                <p className="cart-quantity-text">{quantity}</p>
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
                Remove
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
