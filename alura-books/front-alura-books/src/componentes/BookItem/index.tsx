import { BookItemProps } from './types'

import './BookItem.scss'

const BookItemCard = ({ coverImage, title, minPrice, slug }: BookItemProps) => {
    return (
        <div className='book-item'>
            <img
                className='book-item__cover-image'
                src={coverImage}
                alt={`book_${slug}_image_cover`}
            />
            <h3 className='book-item__title'>{title}</h3>
            <span className='book-item__min-price-label'>A partir de:</span>
            <span className='book-item__min-price'>R$ {minPrice}</span>
            <button className='book-item__button'>Comprar</button>
        </div>
    )
}

export { BookItemCard }
