import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    position: relative;
    margin-top: 12px;

    > input {
        border: 0px;
        padding-left: 10px;
        border-radius: 3px;

        font-family: sans-serif;
    }

    > label {
        position: absolute;
        left: 10px;
        top: 0px;
        display: flex;
        align-items: center;
        pointer-events: none;
        color: var(--darkGray);
    }

    > input, > label {
        width: 100%;
        height: 30px;
        font-size: 16px;
        transition: .05s;
    }
    /* caso o input seja selecionada é feito algo em label */
    /* > input:focus + label {
        
    } */

    > input:not(:placeholder-shown) + label, 
    > input:focus + label {
        font-size: 12px;
        left: 0px;
        color: var(--light);
        top: -25px;
    } 
    
`;