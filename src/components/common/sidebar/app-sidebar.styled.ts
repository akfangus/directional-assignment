import styled from "styled-components";
import { Button } from "antd";

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const MenuContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: transparent !important;
`;

export const LogoutButtonContainer = styled.div`
  padding: 16px;
`;

export const LogoutButton = styled(Button)`
  width: 100%;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: rgba(0, 0, 0, 0.65) !important;
  padding: 4px 16px;
  height: auto;
  font-size: 14px;
  text-align: left;

  &:hover {
    background-color: transparent !important;
    color: rgba(255, 255, 255, 0.85) !important;
  }

  &:active,
  &:focus {
    background-color: transparent !important;
  }
`;
