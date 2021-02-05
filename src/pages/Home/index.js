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
  FormNewQuestion,
} from "./style";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import defaultProfileImg from "../../assets/defaultProfilePhoto.png";
import siteLogo from "../../assets/logo.png";
import { api } from "../../services/api";
import { signOut, getUser } from "../../services/security";
import Modal from "../../components/modal";
import Input from "../../components/input";
import Select from "../../components/select";
import Tag from "../../components/tag";


function Profile() {
  const student = getUser();

  console.log(student);
  return (
    <>
      <section>
        <img src={defaultProfileImg} alt="Profile" />
        <a href="a"> Editar Foto </a>
      </section>

      <section>
        <strong>NOME:</strong>
        <p>{student.studentName}</p>
      </section>

      <section>
        <strong>RA:</strong>
        <p>{student.studentRA}</p>
      </section>

      <section>
        <strong>EMAIL:</strong>
        <p>{student.studentEmail}</p>
      </section>
    </>
  );
}

function Awnser({ Answer }) {
  const student = getUser();

  return (
    <section>
      <header>
        <img src={defaultProfileImg} alt="Response Author"></img>
        <strong>
          Por{" "}
          {Answer.Student.name === student.studentName
            ? "você"
            : Answer.Student.name}
        </strong>
        <p>{format(new Date(Answer.createdAt), "dd/MM/yyyy 'as' hh:mm")}</p>
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
        },
      };

      setQuestionAnswers([...questionAnswers, answserAdded]);
      setUserAwnswer("");
    } catch (error) {
      console.error(error);
      alert(error.response);
    }
  };

  const listAnswers = (Answers) => {
    return Answers.map((a) => <Awnser Answer={a} />);
  };

  const LoadAnswers = ({ show }) => {
    if (show === true) return listAnswers(questionAnswers);
    else return <></>;
  };

  return (
    <QuestionCard>
      <header>
        <img src={defaultProfileImg} alt="Question Author" />
        <strong> por {question.Student.name} </strong>
        <p>{format(new Date(question.createdAt), "dd/MM/yyyy hh:mm")}</p>
      </header>

      <section>
        <strong> {question.title} </strong>
        <p> {question.description} </p>
        <img src={question.image} alt="question" />
      </section>

      <footer>
        <h1 onClick={handleAnswersVisible}>
          {question.Answers.length === 0 ? (
            "Seja o primeiro a responder"
          ) : (
            <>
              {question.Answers.length}{" "}
              {question.Answers.length > 1 ? "Respostas" : "Resposta"}{" "}
            </>
          )}
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

function NewQuestion() {

  const [questionTags, setQuestionTags] = useState();

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const laodCategories = async () => {
      
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    laodCategories();
  }, [])

  return(
    <FormNewQuestion>
        <Input id="title" label="titulo"/>
        <Input id="description" label="Descrição"/>
        <Input id="gist" label="Gist"/>
        <Select id="categorias" label="Categorias">
          <option hidden value=""> Escolha uma categoria </option>
          {categories.map(c => (
            <option value={c.description}>{c.description}</option>
          ))}
        </Select>

        <div>
          <Tag info="Banco de Dados"/>
          <Tag info="BackEnd"/>
          <Tag info="FrontEnd"/>
          <Tag info="Android"/>
        </div>

        <input type="file"/>
        <button>Enviar</button>

      </FormNewQuestion>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload ] = useState(null);

  useEffect(() => {
    const loadQuestion = async () => {
      const resposnse = await api.get("/feed");

      setQuestions(resposnse.data);
    };

    loadQuestion();
  }, [reload]);

  function handleSignOut() {
    signOut();

    history.replace("/");
  }

  function handleReload() {
    setReload(Math.random());
  }

  return ( 
    <>
      <Modal title="Faça uma pergunta">
        <NewQuestion/>
      </Modal>
    
      <Container>
        <Header>
          <Logo src={siteLogo} onClick={handleReload}/>
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
    </>

  );
}

export default Home;
