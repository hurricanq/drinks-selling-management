import React from 'react'

import { products } from './ProductsSection'
import { useDispatch } from 'react-redux'
import { changeQuantity } from '../stores/cart'

const ProductItem = (props) => {
    const {productId, quantity} = props.data
    const [detail, setDetail] = useState([])
    const dispatch = useDispatch()

    const handleMinusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: productId - 1
        }))
    }

    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: productId + 1
        }))
    }

    useEffect(() => {
        const findDetail = products.filter(product => product.id === productId)[0]
        setDetail(findDetail)
    }, [productId])
    return (
        <div>
        
        </div>
    )
}

export default ProductItem
