import { Container, FormLogin, Header, Body, Button } from "./styles";
import Input from "../../components/input";

function Register() {
  return (
    <Container>
      <FormLogin>
        <Header>
          <h1>BEM VINDO AO SENAI OVERFLOW</h1>
        </Header>
        <Body>
        <Input 
            id="ra" 
            label="RA" 
            type="number"
          />
          
          <Input 
            id="name" 
            label="Nome" 
            type="text"
          />

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

          <Input 
            id="valid-password" 
            label="Confirmar Senha" 
            type="passowrd"
          />

          <Button> Cadastrar </Button>
          <a href="a"> caso já tenhas e cadastrado clique para fazer Login</a>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Register;
