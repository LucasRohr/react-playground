import { AuthorSectionProps } from './types'

const AuthorSection = (props: AuthorSectionProps) => {
    const { about } = props
    return (
        <section className='book-details__about-section'>
            <h3 className='book-details__about-section__title'>Sobre o autor</h3>
            <p className='book-details__about-section__paragraph'>{about}</p>
        </section>
    )
}

export { AuthorSection }
