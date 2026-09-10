import { Link, useNavigate } from 'react'
import Cookies from 'js-cookie'
import { FaShoppingCart } from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = ({ restaurantName = 'UNI Resto Cafe' }) => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
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
                  onClick={() => navigate('/cart')}
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

export default Header
