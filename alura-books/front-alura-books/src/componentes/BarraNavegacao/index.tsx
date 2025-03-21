import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BotaoNavegacao from '../BotaoNavegacao'
import ModalCadastroUsuario from '../ModalCadastroUsuario'
import ModalLoginUsuario from '../ModalLoginUsuario'
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'
import { CategoryInterface } from '../../interfaces'
import http from '../../http'

const BarraNavegacao = () => {
    const [modalCadastroAberta, setModalCadastroAberta] = useState(false)
    const [modalLoginAberta, setModalLoginAberta] = useState(false)
    const [categories, setCategories] = useState<CategoryInterface[]>([])

    const token = sessionStorage.getItem('token')
    const [usuarioEstaLogado, setUsuarioEstaLogado] = useState<boolean>(token != null)

    let navigate = useNavigate()

    const getCategories = async () => {
        const response = await http.get<CategoryInterface[]>('categorias')

        if (response) {
            setCategories(response.data)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const aoEfetuarLogin = () => {
        setModalLoginAberta(false)
        setUsuarioEstaLogado(true)
    }

    const efetuarLogout = () => {
        setUsuarioEstaLogado(false)
        sessionStorage.removeItem('token')
        navigate('/')
    }

    const mapCategories = useCallback(() => {
        const mappedCategories = categories.map((category) => {
            const categorySlug = `/categorias/${category.slug}`

            return (
                <li>
                    <Link to={categorySlug}>{category.nome}</Link>
                </li>
            )
        })

        return mappedCategories
    }, [categories])

    return (
        <nav className='ab-navbar'>
            <h1 className='logo'>
                <Link to='/'>
                    <img className='logo' src={logo} alt='Logo da AluraBooks' />
                </Link>
            </h1>
            <ul className='navegacao'>
                <li>
                    <a href='#!'>Categorias</a>
                    <ul className='submenu'>{mapCategories()}</ul>
                </li>
            </ul>
            <ul className='acoes'>
                {!usuarioEstaLogado && (
                    <>
                        <li>
                            <BotaoNavegacao
                                texto='Login'
                                textoAltSrc='Icone representando um usuário'
                                imagemSrc={usuario}
                                onClick={() => setModalLoginAberta(true)}
                            />
                            <ModalLoginUsuario
                                aberta={modalLoginAberta}
                                aoFechar={() => setModalLoginAberta(false)}
                                aoEfetuarLogin={aoEfetuarLogin}
                            />
                        </li>
                        <li>
                            <BotaoNavegacao
                                texto='Cadastrar-se'
                                textoAltSrc='Icone representando um usuário'
                                imagemSrc={usuario}
                                onClick={() => setModalCadastroAberta(true)}
                            />
                            <ModalCadastroUsuario
                                aberta={modalCadastroAberta}
                                aoFechar={() => setModalCadastroAberta(false)}
                            />
                        </li>
                    </>
                )}
                {usuarioEstaLogado && (
                    <>
                        <li>
                            <Link to='/minha-conta/pedidos'>Minha conta</Link>
                        </li>
                        <li>
                            <BotaoNavegacao
                                texto='Logout'
                                textoAltSrc='Icone representando um usuário'
                                imagemSrc={usuario}
                                onClick={efetuarLogout}
                            />
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default BarraNavegacao
