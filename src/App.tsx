import { useEffect, useState } from "react";
import { Form } from "./components/Form/Form";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { getOptions } from "./api/api";
import { State } from "./utils/types";
import styled, { createGlobalStyle } from "styled-components";

const GlobalTheme = createGlobalStyle`
  body, html {
    height: 100%;
    width: 100%;
    margin: 0;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    overflow-y: hidden;
    background: #f1f2f6;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }

  .display-error {
    border: 1px solid #ff6b81;
  }
`;

const OuterLayout = styled.div`
  background: #f1f2f6;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`;

const InnerLayout = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff;
  border-radius: 12px;
  justify-content: center;
  width: 80%;
  margin: 32px auto 0 auto;
`;

function App() {
  const [occupations, setOccupations] = useState<Array<string>>([]);
  const [states, setStates] = useState<Array<State>>([]);

  useEffect(() => {
    getOptions().then((res) => {
      if (res) {
        const { occupations, states } = res;

        setOccupations(occupations);
        setStates(states);
      }
    });
  }, []);

  return (
    <>
      <GlobalTheme />
      <OuterLayout data-testid="main">
        <InnerLayout>
          <Sidebar />
          <Form occupations={occupations} states={states} />
        </InnerLayout>
      </OuterLayout>
    </>
  );
}

export default App;
