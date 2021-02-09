import { Container } from "./style";

import imgLogo from "../../assets/logo.png";

function Loading() {
    return(
        <Container>
            <img src={imgLogo} alt="Loading"/>
            Carregando...
        </Container>
    )
}

export default Loading;