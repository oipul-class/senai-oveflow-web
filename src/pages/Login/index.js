import { Container, FormLogin, Header, Body, Button } from "./styles";
import Input from "../../components/input";

function Login() {
  return (
    <Container>
      <FormLogin>
        <Header>
          <h1>BEM VINDO AO SENAI OVERFLOW</h1>
          <h1>O SEU PORTAL DE RESPOSTA</h1>
        </Header>
        <Body>
          <Input 
            id="email" 
            label="E-mail" 
            type="email"
          />
          <Input 
            id="password" 
            label="Senha" 
            type="password"
          />
          <Button> Entrar </Button>
          <a href="a"> Ou clique para se cadastrar</a>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Login;
