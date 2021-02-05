import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root { /* setando variaveis */
    --dark: #282a36;
    --darkGray: #44475a;
    --light: #EDF2F4;
    --primary: #EF233C;
    --secondary: #D90425;
  }
  
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  

  ::-webkit-scrollbar {
    width: 4px;
    background-color: var(--darkGray);
  }

  /* mudando a trilha onde a rolagem passa */
  ::-webkit-scrollbar-track {   
    background-color: var(--darkGray);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: var(--light);
  }

  body {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: var(--light); /* usando a varaivel */
    background-color: var(--darkGray);
  }

  button {
    padding: 10px;
    font-weight: bold;
    color: var(--light);
    background-color: var(--darkGray);
    border: 1px solid var(--light);
    border-radius: 4px;
    cursor: pointer;
    transition: .2s ease-in-out;


    :disabled {
      background-color: transparent;
      border: 1px solid var(--darkGray);
      color: var(--darkGray);
    }

    :active {
      transform: scale(0.95);
    }

    :hover {
      background-color: var(--primary);
    }
  }

  a {
    color: var(--light);

    transition: .2s;

    :active {
      transform: scale(0.95);
    }

    :hover {
      color: var(--primary);
    }
  }

  textarea, select {
    font-size: 16px;
    padding: 5px;
    border-radius: 4px;

    resize: none;
  }

  
`;
