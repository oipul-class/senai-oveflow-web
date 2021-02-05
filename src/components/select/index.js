import { Container } from "./style";

function Select({ id, label, handler, children,...rest}) {

    return (
        <Container>
            <label htmlFor={id}>{label}</label>
            <select id={id}>
               {children}
               
            </select>
        </Container>
    )
}

export default Select;