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


import defaultProfileImg from "../../assets/defaultProfilePhoto.png";
import siteLogo from "../../assets/logo.png";

function Profile() {
  return (
    <>
      <section>
        <img src={defaultProfileImg} />
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

function Home() {
  return (
    <Container>
      <Header>
        <IconSignOut/>
        <Logo src={siteLogo}/>

      </Header>

      <Content>
        <ProfileContainer>
          <Profile />
        </ProfileContainer>
        <FeedContainer>
          <QuestionCard>
            <header>
                <img src={defaultProfileImg}/>
                <strong> por Ciclano da Silva </strong>
                <p> em 12/12/2012 as 12:12 </p>
            </header>

            <section>
                <strong> Titulo </strong>
                <p> Descrição </p>
                <img src="https://miro.medium.com/max/3840/1*vHHBwcUFUaHWXntSnqKdCA.png"/>
            </section>

            <footer>
              <h1>11 Respostas</h1>
              <section>
                <header>
                  <img src={defaultProfileImg}></img>
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

          <QuestionCard>
            <header>
                <img src={defaultProfileImg}/>
                <strong> por Ciclano da Silva </strong>
                <p> em 12/12/2012 as 12:12 </p>
            </header>

            <section>
                <strong> Titulo </strong>
                <p> Descrição </p>
                <img src="https://miro.medium.com/max/3840/1*vHHBwcUFUaHWXntSnqKdCA.png"/>
            </section>

            <footer>
              <h1>11 Respostas</h1>
              <section>
                <header>
                  <img src={defaultProfileImg}></img>
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
        </FeedContainer>
        <ActionsContainer>
          <button>Fazer uma pergunta</button>
        </ActionsContainer>
      </Content>
    </Container>
  );
}

export default Home;
