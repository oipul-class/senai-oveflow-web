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
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";

import defaultProfileImg from "../../assets/defaultProfilePhoto.png";
import siteLogo from "../../assets/logo.png";
import { api } from "../../services/api";
import { signOut, getUser } from "../../services/security";
import Modal from "../../components/modal";
import Input from "../../components/input";
import Select from "../../components/select";
import Tag from "../../components/tag";
import Loading from "../../components/loading";
import Alert from "../../components/alert";

function Profile() {
  const student = getUser();

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

function Question({ question, setShowLoading }) {
  const [questionAnswers, setQuestionAnswers] = useState([]);

  const [userAnswer, setUserAwnswer] = useState("");

  const [answersVisible, setAnswersVisible] = useState(false);

  useEffect(() => {
    setQuestionAnswers(question.Answers);
  }, [question.Answers]);

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
      setShowLoading(true);
      const response = await api.post(`questions/${question.id}/anwsers`, {
        answer: userAnswer,
      });

      const aluno = getUser();

      const answserAdded = {
        id: response.data.id,
        answer: userAnswer,
        createdAt: response.data.createdAt,
        Student: {
          id: aluno.studentId,
          name: aluno.studentName,
        },
      };

      setQuestionAnswers([...questionAnswers, answserAdded]);
      setUserAwnswer("");
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
      console.error(error.response);
      alert(error);
    }
  };

  const listAnswers = (Answers) => {
    return Answers.map((a) => <Awnser key={a.id} Answer={a} />);
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
        {question.image ? <img src={question.image} alt="question" /> : <></>}
      </section>

      <footer>
        <h1 onClick={handleAnswersVisible}>
          {questionAnswers.length === 0 ? (
            "Seja o primeiro a responder"
          ) : (
            <>
              {questionAnswers.length}{" "}
              {questionAnswers.length > 1 ? "Respostas" : "Resposta"}{" "}
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

function NewQuestion({ handleReload, setShowLoading }) {
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    gist: "",
  });

  const [categories, setCategories] = useState([]);

  const [categoriesSel, setCategoriesSel] = useState([]);

  const [questionImage, setquestionImage] = useState(null);

  const questionImageRef = useRef(); //referencia da tag img

  const categoriesRef = useRef();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    loadCategories();
  }, []);

  const handleCategories = (event) => {
    const idSel = event.target.value;

    const categorySel = categories.find((c) => c.id.toString() === idSel);

    if (!categoriesSel.includes(categorySel)) {
      setCategoriesSel([...categoriesSel, categorySel]);

      event.target[event.target.selectedIndex].disabled = true;
      event.target.value = "";
    }
  };

  const handleImage = (event) => {
    if (event.target.files[0]) {
      questionImageRef.current.src = URL.createObjectURL(event.target.files[0]); //colando a image selecionada pelo usuario
      questionImageRef.current.style.display = "flex";
    } else {
      questionImageRef.current.src = "";
      questionImageRef.current.style.display = "none";
    }
    setquestionImage(event.target.files[0]);
  };

  const handleUnselCategorie = (idUnsel) => {
    setCategoriesSel(categoriesSel.filter((c) => c.id !== idUnsel));

    const { options } = categoriesRef.current;

    for (let forIndex = 0; forIndex < options.length; forIndex++) {
      if (options[forIndex].value === idUnsel.toString())
        options[forIndex].disabled = false;
    }
  };

  const handleInput = (event) => {
    setNewQuestion({ ...newQuestion, [event.target.id]: event.target.value });
  };

  const handleAddNewQuestion = async (event) => {
    event.preventDefault();

    const data = new FormData();

    data.append("title", newQuestion.title);
    data.append("description", newQuestion.description);
    data.append("gist", newQuestion.gist);

    const categories = categoriesSel.reduce((s, c) => (s += c.id + ","), "");

    data.append("categories", categories.substr(0, categories.length - 1));

    if (questionImage) data.append("image", questionImage);

    try {
      setShowLoading(true);
      await api.post("/questions", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      handleReload();
      setShowLoading(false);
    } catch (error) {
      setShowLoading(false);
      console.log(error);
    }
  };

  return (
    <FormNewQuestion onSubmit={handleAddNewQuestion}>
      <Input
        id="title"
        label="titulo"
        value={newQuestion.title}
        handler={handleInput}
      />
      <Input
        id="description"
        label="Descrição"
        value={newQuestion.description}
        handler={handleInput}
      />
      <Input
        id="gist"
        label="Gist"
        value={newQuestion.gist}
        handler={handleInput}
      />
      <Select
        id="categorias"
        label="Categorias"
        handler={handleCategories}
        ref={categoriesRef}
      >
        <option hidden value="">
          {" "}
          Escolha uma categoria{" "}
        </option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.description}
          </option>
        ))}
      </Select>

      <div>
        {categoriesSel.map((c) => (
          <Tag
            key={c.id}
            info={c.description}
            handleClose={() => {
              handleUnselCategorie(c.id);
            }}
          ></Tag>
        ))}
      </div>

      <input type="file" onChange={handleImage} />
      <img ref={questionImageRef} alt="pre-visualization" />
      <button>Enviar</button>
    </FormNewQuestion>
  );
}

function Home() {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);

  const [reload, setReload] = useState(null);

  const [ alertMessage, setAlertMessage ] = useState(undefined);

  const [showLoading, setShowLoading] = useState(false);

  const [showNewQuestion, setShowNewQuestion] = useState(false);

  useEffect(() => {
    const loadQuestion = async () => {
      setShowLoading(true);
      const resposnse = await api.get("/feed");
      setQuestions(resposnse.data);
      setShowLoading(false);
    };

    loadQuestion();
  }, [reload]);

  function handleSignOut() {
    signOut();

    history.replace("/");
  }

  function handleReload() {
    setShowNewQuestion(false);
    setReload(Math.random());
  }

  return (
    <>
      <Alert
        message={alertMessage}
        type="error"
      />
      {showLoading && <Loading />}
      {showNewQuestion && (
        <Modal
          title="Faça uma pergunta"
          handleClose={() => {
            setShowNewQuestion(false);
          }}
        >
          <NewQuestion
            handleReload={handleReload}
            setShowLoading={setShowLoading}
          />
        </Modal>
      )}

      <Container>
        <Header>
          <Logo src={siteLogo} onClick={handleReload} />
          <IconSignOut onClick={handleSignOut} />
        </Header>

        <Content>
          <ProfileContainer>
            <Profile />
          </ProfileContainer>
          <FeedContainer>
            {questions.map((q) => (
              <Question
                key={q.id}
                question={q}
                setShowLoading={setShowLoading}
              />
            ))}
          </FeedContainer>
          <ActionsContainer>
            <button
              onClick={() => {
                setShowNewQuestion(true);
              }}
            >
              Fazer uma pergunta
            </button>
          </ActionsContainer>
        </Content>
      </Container>
    </>
  );
}

export default Home;
