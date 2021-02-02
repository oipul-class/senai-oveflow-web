import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCard,
  Logo,
  IconSignOut,
} from "./style";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import defaultProfileImg from "../../assets/defaultProfilePhoto.png";
import siteLogo from "../../assets/logo.png";
import { api } from "../../services/api";
import { signOut } from "../../services/security";

function Profile() {
  return (
    <>
      <section>
        <img src={defaultProfileImg} alt="Profile" />
        <a href="a"> Editar Foto </a>
      </section>

      <section>
        <strong>NOME:</strong>
        <p>Fulano De Tal</p>
      </section>

      <section>
        <strong>RA:</strong>
        <p>1234567</p>
      </section>

      <section>
        <strong>EMAIL:</strong>
        <p>fulano@gmail.com</p>
      </section>
    </>
  );
}

function Question({question}) {

  const hora = question.createdAt.split("T")
  const data = hora[0].split("-");
  const dataArrumada = `${data[2]}-${data[1]}-${data[0]}`;
  const horaArrumada =  hora[1].replace(".000Z", "");

  return (
    <QuestionCard>
      <header>
        <img src={defaultProfileImg} alt="Question Author" />
        <strong> por {question.Student.name} </strong>
        <p> em {dataArrumada} as {horaArrumada} </p>
      </header>

      <section>
        <strong> {question.title} </strong>
        <p> {question.description} </p>
        <img src={question.image} />
      </section>

      <footer>
        <h1>11 Respostas</h1>
        <section>
          <header>
            <img src={defaultProfileImg} alt="Response Author"></img>
            <strong>Por fulano</strong>
            <p>12/12/2012 as 12:12</p>
          </header>
          <p>Resposta para perguntas</p>
        </section>
        <form>
          <textarea placeholder="Responda essa duvida" required></textarea>
          <button>Enviar</button>
        </form>
      </footer>
    </QuestionCard>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const loadQuestion = async () => {
      const resposnse = await api.get("/feed");

      setQuestions(resposnse.data);
    };

    loadQuestion();
  }, []);

  function handleSignOut() {
    signOut();

    history.replace("/");
  }

  return (
    <Container>
      <Header>
        <Logo src={siteLogo} />
        <IconSignOut onClick={handleSignOut} />
      </Header>

      <Content>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <FeedContainer>
          {questions.map(q => <Question question={q}/>)}
        </FeedContainer>
        <ActionsContainer>
          <button>Fazer uma pergunta</button>
        </ActionsContainer>
      </Content>
    </Container>
  );
}

export default Home;
