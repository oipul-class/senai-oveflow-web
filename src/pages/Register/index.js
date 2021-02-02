import { Container, FormLogin, Header, Body, Button } from "./styles";
import Input from "../../components/input";
import { Link, useHistory } from "react-router-dom"; //uma tag para redirecionamento de page
import { api } from "../../services/api";
import { useState } from "react";

function Register() {
  const history = useHistory();

  const [validPassword, setValidPassword] = useState("");

  const [cadastro, setCadastro] = useState({
    ra: "",
    name: "",
    email: "",
    password: "",
  });

  const handleVerifyValues = () => {
    const {name, ra, email, password } = cadastro;
    if (
      ra === "" ||
      name === "" ||
      email === "" ||
      password === "" ||
      validPassword === "" ||
      password !== validPassword
    ) {
      return true;
    } else {
      return false;

      
    }
  };

  const handleValidPassword = (event) => {
    setValidPassword(event.target.value);
  };

  const handleInput = (event) => {
    setCadastro({ ...cadastro, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(cadastro);
    try {
      if (cadastro.password === validPassword) {
        const response = await api.post("/students", cadastro);

        console.log(response.data);
        history.push("/home");
      } else {
        alert("senha não é igual a confirmação da senha");
      }
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
        </Header>
        <Body>
          <Input
            id="ra"
            label="RA"
            type="text"
            value={cadastro.ra}
            handler={handleInput}
            required
          />

          <Input
            id="name"
            label="Nome"
            type="text"
            value={cadastro.name}
            handler={handleInput}
            required
          />

          <Input
            id="email"
            label="E-mail"
            type="email"
            value={cadastro.email}
            handler={handleInput}
            required
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={cadastro.password}
            handler={handleInput}
            required
          />

          <Input
            id="validPassword"
            label="Confirmar Senha"
            type="passowrd"
            value={validPassword}
            handler={handleValidPassword}
            required
          />

          <Button disabled={handleVerifyValues()}> Cadastrar </Button>
          <Link to="/">
            {" "}
            caso já tenhas e cadastrado clique para fazer Login
          </Link>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Register;
