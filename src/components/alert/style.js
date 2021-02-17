import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    border-radius: 4px;

    width: 300px;
    height: 80px;
    margin: 10px;

    transition: width 0.4s;

    background-color: ${(props) => props.type === "error" ? "#D90425" : "#04D925CC"}; 

    white-space: nowrap;
    overflow: hidden;
    > span {
        position: absolute;
        top: 15px;
        right: 20px;

        font-size: 30px;

        cursor: pointer;
        user-select: none;
        transition: .2s;

        :hover {
            color: var(--dark);
        }
    }

    > h1 {
        font-size: 18px;
        margin: 5px;

        
    }

    > p {
        font-size: 14px;

        margin-left: 5px;
    }
`;