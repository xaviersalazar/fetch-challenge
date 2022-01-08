import styled from "styled-components";
import icon from "../../icon.png";

const SidebarContainer = styled.div`
  flex: 1;
  background: linear-gradient(-45deg, #c9d6ff, #e2e2e2);
  padding: 32px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const CompanyContainer = styled.div`
  display: flex;
`;

const Logo = styled.div`
  position: relative;
  top: 8px;
  margin-right: 12px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: #000000;
`;

const Title = styled.h2`
  margin: 0;
  position: relative;
  top: 32px;
`;

const Image = styled.img`
  position: relative;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
`;

export const Sidebar = () => (
  <SidebarContainer id="sidebar">
    <CompanyContainer>
      <Logo />
      <Title>company</Title>
    </CompanyContainer>
    <Image src={icon} />
  </SidebarContainer>
);
