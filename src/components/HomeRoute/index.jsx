import { useState, useEffect } from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import './index.css'

const HomeRoute = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [responseObj, setResponseObj] = useState(null)
  const [activeCategoryId, setActiveCategoryId] = useState('')

  useEffect(() => {
    getRestaurantData()
  }, [])

  const getRestaurantData = async () => {
    const api = 'https://apis.ccbp.in/restaurant-static-dataset'
    try {
      const response = await fetch(api)
      const data = await response.json()
      const dataObj = Array.isArray(data) ? data[0] : data

      setResponseObj(dataObj)
      if (dataObj.table_menu_list && dataObj.table_menu_list.length > 0) {
        setActiveCategoryId(dataObj.table_menu_list[0].menu_category_id)
      }
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  const onChangeCategory = categoryId => {
    setActiveCategoryId(categoryId)
  }

  const renderLoadingView = () => (
    <div className="loader-container">
      <div className="spinner" />
      <p className="loading-text">Fetching delicious menu...</p>
    </div>
  )

  const renderMenuView = () => {
    const { restaurant_name: restaurantName, table_menu_list: tableMenuList } = responseObj

    const activeCategory = tableMenuList.find(
      category => category.menu_category_id === activeCategoryId
    )
    const activeCategoryDishes = activeCategory ? activeCategory.category_dishes : []

    return (
      <div className="home-container">
        <Header restaurantName={restaurantName} />

        <ul className="category-tabs-container">
          {tableMenuList.map(eachCategory => (
            <li key={eachCategory.menu_category_id} className="category-tab-item">
              <button
                type="button"
                className={`tab-btn ${
                  eachCategory.menu_category_id === activeCategoryId ? 'active-tab-btn' : ''
                }`}
                onClick={() => onChangeCategory(eachCategory.menu_category_id)}
              >
                {eachCategory.menu_category}
              </button>
            </li>
          ))}
        </ul>

        <main className="dishes-main-container">
          <ul className="dishes-list">
            {activeCategoryDishes.map(eachDish => (
              <DishItem key={eachDish.dish_id} dish={eachDish} />
            ))}
          </ul>
        </main>
      </div>
    )
  }

  return isLoading ? renderLoadingView() : renderMenuView()
}

export default HomeRoute
