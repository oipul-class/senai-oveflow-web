import { Container, FormLogin, Header, Body, Button } from "./styles";
import Input from "../../components/input";
import { Link, useHistory } from "react-router-dom";

import { api } from "../../services/api";
import { useState } from "react";

function Login() {
  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setLogin({ ...login, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/sessions", login);

      console.log(response.data);

      
    
      history.push("/home");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }

  };

  return (
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <Header>
          <h1>BEM VINDO AO SENAI OVERFLOW</h1>
          <h1>O SEU PORTAL DE RESPOSTA</h1>
        </Header>
        <Body>
          <Input
            id="email"
            label="E-mail"
            type="email"
            value={login.email}
            handler={handleInput}
            required
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={login.password}
            handler={handleInput}
            required
          />
          <Button> Entrar </Button>
          <Link to="/register"> Ou clique para se cadastrar</Link>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Login;
