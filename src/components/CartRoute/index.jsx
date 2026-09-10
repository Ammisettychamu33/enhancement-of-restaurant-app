import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const CartRoute = () => (
  <CartContext.Consumer>
    {value => {
      const { cartList, removeAllCartItems } = value
      const isCartEmpty = cartList.length === 0

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      const totalOrderPrice = cartList.reduce(
        (acc, item) => acc + item.dishPrice * item.quantity,
        0
      )
      const currency = cartList.length > 0 ? cartList[0].dishCurrency : 'SAR'

      return (
        <div className="cart-route-container">
          <Header />
          <div className="cart-content-container">
            {isCartEmpty ? (
              <div className="empty-cart-view">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="empty cart"
                  className="empty-cart-image"
                />
                <h2 className="empty-cart-heading">Your Cart Is Empty</h2>
              </div>
            ) : (
              <div className="cart-body-container">
                <div className="cart-header-actions">
                  <h2 className="my-cart-heading">My Cart</h2>
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={onClickRemoveAll}
                  >
                    Remove All
                  </button>
                </div>

                <ul className="cart-list">
                  {cartList.map(eachItem => (
                    <CartItem key={eachItem.dishId} cartItemDetails={eachItem} />
                  ))}
                </ul>

                <div className="cart-summary-container">
                  <div className="summary-card">
                    <h3 className="summary-total-label">
                      Order Total:{' '}
                      <span className="summary-total-value">
                        {currency} {totalOrderPrice.toFixed(2)}
                      </span>
                    </h3>
                    <p className="summary-items-count">
                      {cartList.length} {cartList.length === 1 ? 'item' : 'items'} in cart
                    </p>
                    <button type="button" className="checkout-btn">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartRoute
