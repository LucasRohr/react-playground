import { AbBotao, AbCard } from 'ds-alurabooks'
import { useState } from 'react'
import { IBook } from '../../interfaces/ILivro'

import './LivrosDestaque.css'

interface LivrosDestaqueProps {
    livros: IBook[]
}

const LivrosDestaque = ({ livros }: LivrosDestaqueProps) => {
    const [selecionado, selecionarLivro] = useState<IBook>(livros[0])

    return (
        <section className='LivrosDestaque'>
            <div>
                <ul className='livros'>
                    {livros.map((livro) => {
                        return (
                            <li
                                key={livro.title}
                                onClick={() => selecionarLivro(livro)}
                                className={selecionado?.title === livro.title ? 'selecionado' : ''}
                            >
                                <img
                                    src={livro.coverImage}
                                    alt={`Capa do livro ${livro.title} escrito por ${livro.writer}`}
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
            <AbCard>
                <div className='selecionado-detalhes'>
                    <header>
                        <h5>Sobre o livro:</h5>
                    </header>
                    <h6>{selecionado.title}</h6>
                    <p>{selecionado.description}</p>
                    <p>Por: {selecionado.writer}</p>
                    <footer>
                        <div className='preco'>
                            <em>A partir de:</em>
                            <strong>
                                {Intl.NumberFormat('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(selecionado.buyOptions[0].price)}
                            </strong>
                        </div>
                        <div>
                            <AbBotao texto='Comprar' />
                        </div>
                    </footer>
                </div>
            </AbCard>
        </section>
    )
}

export default LivrosDestaque
