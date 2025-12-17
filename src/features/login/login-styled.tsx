import { Typography, Card, Button } from "antd";
import styled from "styled-components";

const { Title } = Typography;

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
`;

export const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 24px !important;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  height: 44px;
  font-size: 16px;
`;
