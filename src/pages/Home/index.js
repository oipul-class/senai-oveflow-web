import {
  Container,
  Header,
  Content,
  ProfileContainer,
  FeedContainer,
  ActionsContainer,
  QuestionCard,
} from "./style";

import defaultProfileImg from "../../assets/defaultProfilePhoto.png";

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
      <Header></Header>

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
