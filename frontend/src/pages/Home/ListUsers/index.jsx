import api from '../../../services/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import DefaultButton from '../../../components/Button'
import TopBackground from '../../../components/Button/TopBackground'
import Trash from '../../../assets/trash.svg'

import {
    Container,
    Title,
    ContainerUsers,
    CardUsers,
    TrashIcon,
    AvatarUser
} from './styles'

function ListUsers() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getUsers() {
            const { data } = await api.get('/usuarios')
            setUsers(data)
        }

        getUsers()
    }, [])

    function handleGoBack() {
        navigate('/') // 👈 rota da tela de cadastro
    }

    async function deleteUsers(id) {
        await api.delete(`/usuarios/${id}`)

        const updatedUsers = users.filter(user => user.id !== id)

        setUsers(updatedUsers)
    }

    return (
        <Container>
            <TopBackground />
            <Title>Lista de Usuários</Title>

            <ContainerUsers>
                {users.map(user => (
                    <CardUsers key={user.id}>
                        <AvatarUser
                            src={`https://api.dicebear.com/7.x/personas/svg?seed=${user.id}`}
                            alt="avatar"
                        />

                        <div>
                            <h3>{user.name}</h3>
                            <p>{user.age}</p>
                            <p>{user.email}</p>
                        </div>

                        <TrashIcon src={Trash} alt="icone-lixo" onClick={() => deleteUsers(user.id)} />
                    </CardUsers>
                ))}
            </ContainerUsers>

            <DefaultButton type="button" onClick={handleGoBack}>
                Voltar
            </DefaultButton>
        </Container>
    )
}

export default ListUsers