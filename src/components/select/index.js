import { forwardRef } from "react";
import { Container } from "./style";

const Select = forwardRef(({ id, label, handler, children,...rest}, ref) => {

    return (
        <Container>
            <label htmlFor={id}>{label}</label>
            <select id={id} onChange={handler} {...rest} ref={ref}>
               {children}
               
            </select>
        </Container>
    )
});

export default Select;