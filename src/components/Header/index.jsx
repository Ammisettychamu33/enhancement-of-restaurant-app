import { Link, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import { FaShoppingCart } from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const { restaurantName = 'UNI Resto Cafe' } = props

  const onClickLogout = () => {
    const { history } = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const { cartList } = value
        const cartItemsCount = cartList.length

        return (
          <header className="nav-header">
            <div className="nav-content">
              <Link to="/" className="nav-logo-link">
                <h1 className="restaurant-name">{restaurantName}</h1>
              </Link>

              <div className="nav-actions">
                <p className="my-orders-text">My Orders</p>
                <button
                  type="button"
                  className="cart-icon-btn"
                  data-testid="cart"
                  onClick={() => {
                    const { history } = props
                    history.push('/cart')
                  }}
                  aria-label="cart"
                >
                  <FaShoppingCart className="cart-icon" />
                  <span className="cart-badge">{cartItemsCount}</span>
                </button>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
