import api from '../../../services/api'
import { useEffect } from 'react';

import DefaultButton from '../../../components/Button'
import TopBackground from '../../../components/Button/TopBackground';


function ListUsers() {

    let users = [
        {
            age: 29,
            email: "luanaebrenno@gmail.com",
            id: "69669e2669c115ada1466658",
            name: "Luana"
        },

        {
            age: 33,
            email: "abacate@gmail.com",
            id: "696634hsk39e2669c115ada1466658",
            name: "Abacate"
        }
    ];

    useEffect(() => {

        async function getUsers() {
            const { data } = await api.get('/usuarios');
            console.log(data);
        }
        getUsers();
    }, []);

    // Toda vez que a tela carrega, o useEffect e chamado
    // Toda vez que uma determinada variavel muda de valor, ele e chamado


    return (
        <div>
            <TopBackground />
            <h1>Lista de Usuários</h1>

            {users.map(user => (
                <div>
                    <p>{user.name}</p>
                    <p>{user.age}</p>
                    <p>{user.email}</p>
                </div>
            ))}

            <DefaultButton>Voltar</DefaultButton>
        </div>
    );
}

export default ListUsers;