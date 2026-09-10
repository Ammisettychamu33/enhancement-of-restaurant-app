import { useState } from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const DishItem = ({ dish }) => {
  const [quantity, setQuantity] = useState(0)

  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_currency: dishCurrency,
    dish_calories: dishCalories,
    dish_description: dishDescription,
    dish_Availability: dishAvailability,
    dish_Type: dishType,
    dish_image: dishImage,
    addonCat,
  } = dish

  const onIncrement = () => {
    setQuantity(prev => prev + 1)
  }

  const onDecrement = () => {
    setQuantity(prev => (prev > 0 ? prev - 1 : 0))
  }

  const isVeg = dishType === 2 || dishType === 1 // Veg indicator check (standard dataset: 1 or 2)

  return (
    <CartContext.Consumer>
      {value => {
        const { addCartItem } = value

        const onClickAddToCart = () => {
          if (quantity > 0) {
            addCartItem({
              dishId,
              dishName,
              dishPrice,
              dishCurrency,
              dishImage,
              dishCalories,
              quantity,
            })
          }
        }

        return (
          <li className="dish-item-card">
            <div className={`type-indicator ${dishType === 2 ? 'veg' : 'non-veg'}`}>
              <div className="type-circle" />
            </div>

            <div className="dish-details-container">
              <h3 className="dish-title">{dishName}</h3>
              <p className="dish-price">
                {dishCurrency} {dishPrice}
              </p>
              <p className="dish-description">{dishDescription}</p>

              {dishAvailability ? (
                <div className="quantity-controller-container">
                  <div className="quantity-btn-group">
                    <button
                      type="button"
                      className="quantity-controller-btn"
                      onClick={onDecrement}
                    >
                      -
                    </button>
                    <span className="quantity-count-text">{quantity}</span>
                    <button
                      type="button"
                      className="quantity-controller-btn"
                      onClick={onIncrement}
                    >
                      +
                    </button>
                  </div>
                  {quantity > 0 && (
                    <button
                      type="button"
                      className="add-to-cart-btn"
                      onClick={onClickAddToCart}
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              ) : (
                <p className="not-available-text">Not available</p>
              )}

              {addonCat && addonCat.length > 0 && (
                <p className="customizations-text">Customizations available</p>
              )}
            </div>

            <div className="dish-calories-image-container">
              <p className="calories-text">{dishCalories} calories</p>
              <img
                src={dishImage}
                alt={dishName}
                className="dish-item-image"
              />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
