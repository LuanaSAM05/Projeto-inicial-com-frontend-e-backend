import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  Container,
  Title,
  Form,
  ContainerInputs,
  InputLabel,
  Input,
} from "./styles";


import DefaultButton from "../../components/Button";
import TopBackground from "../../components/Button/TopBackground";

function Home() {
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  const navigate = useNavigate();

  async function registerNewUser() {
    await api.post('/usuarios', {
      email: inputEmail.current.value,
      age: parseInt(inputAge.current.value),
      name: inputName.current.value,
    });

  }

  return (
    <Container>
      <TopBackground />

      <Form>
        <Title>Cadastrar Usuário</Title>

        <ContainerInputs>
          <div>
            <InputLabel>
              Nome<span> *</span>
            </InputLabel>
            <Input
              type="text"
              placeholder="Nome do usuário"
              ref={inputName}
            />
          </div>

          <div>
            <InputLabel>
              Idade<span> *</span>
            </InputLabel>
            <Input
              type="number"
              placeholder="Idade do usuário"
              ref={inputAge}
            />
          </div>
        </ContainerInputs>

        <div style={{ width: "100%" }}>
          <InputLabel>
            Email<span> *</span>
          </InputLabel>
          <Input
            type="email"
            placeholder="Email do usuário"
            ref={inputEmail}
          />
        </div>

        <DefaultButton type="button" onClick={registerNewUser} theme="primary">
          Cadastrar Usuário
        </DefaultButton>
      </Form>

      <DefaultButton type="button" onClick={() => navigate('/lista-de-usuarios')}>
        Ver Lista de Usuários
      </DefaultButton>

    </Container>
  );
}

export default Home;