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
import { signOut, getUser } from "../../services/security";

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

function Awnser({ Answer }) {
  const hora = Answer.createdAt.split("T");
  const data = hora[0].split("-");
  const dataArrumada = `${data[2]}-${data[1]}-${data[0]}`;
  const horaArrumada = hora[1].replace(".000Z", "");

  return (
    <section>
      <header>
        <img src={defaultProfileImg} alt="Response Author"></img>
        <strong>Por {Answer.Student.name}</strong>
        <p>
          {dataArrumada} as {horaArrumada}
        </p>
      </header>
      <p>{Answer.answer}</p>
    </section>
  );
}

function Question({ question }) {
  const [questionAnswers, setQuestionAnswers] = useState(question.Answers);

  const [userAnswer, setUserAwnswer] = useState("");

  const [answersVisible, setAnswersVisible] = useState(false);

  const handleUserAnswer = (event) => {
    setUserAwnswer(event.target.value);
  };

  const handleAnswersVisible = () => {
    if (answersVisible === true) return setAnswersVisible(false);
    else return setAnswersVisible(true);
  };

  const handleAddAnswer = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(`questions/${question.id}/anwsers`, {
        answer: userAnswer,
      });

      const aluno = getUser();

      const answserAdded = {
        id: response.data.id,
        answer: userAnswer,
        createdAt: response.data.createdAt,
        Student: {
          id: aluno.id,
          name: aluno.name,
        }
      }

      setQuestionAnswers([...questionAnswers, answserAdded]);
      setQuestionAnswers("");
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  const listAnswers = (Answers) => {
    return Answers.map((a) => <Awnser Answer={a} />);
  };

  const LoadAnswers = ({ show }) => {
    if (show === true) return listAnswers(questionAnswers);
    else return <></>;
  };

  const hora = question.createdAt.split("T");
  const data = hora[0].split("-");
  const dataArrumada = `${data[2]}-${data[1]}-${data[0]}`;
  const horaArrumada = hora[1].replace(".000Z", "");

  return (
    <QuestionCard>
      <header>
        <img src={defaultProfileImg} alt="Question Author" />
        <strong> por {question.Student.name} </strong>
        <p>
          {" "}
          em {dataArrumada} as {horaArrumada}{" "}
        </p>
      </header>

      <section>
        <strong> {question.title} </strong>
        <p> {question.description} </p>
        <img src={question.image} />
      </section>

      <footer>
        <h1 onClick={handleAnswersVisible}>
          {question.Answers.length === 0 ? ("Seja o primeiro a responder") : (<>{question.Answers.length} {question.Answers.length > 1 ? "Respostas" : "Resposta"} </>)} 
        </h1>

        <LoadAnswers show={answersVisible} />

        <form onSubmit={handleAddAnswer}>
          <textarea
            onChange={handleUserAnswer}
            value={userAnswer}
            placeholder="Responda essa duvida"
            minLength={10}
            required
          ></textarea>
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
          {questions.map((q) => (
            <Question question={q} />
          ))}
        </FeedContainer>
        <ActionsContainer>
          <button>Fazer uma pergunta</button>
        </ActionsContainer>
      </Content>
    </Container>
  );
}

export default Home;
