/**
 * AppLayout 스타일 컴포넌트
 */

import styled from "styled-components";
import { Layout, Menu } from "antd";

const { Sider, Content } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledSider = styled(Sider)`
  position: fixed !important;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  height: 100vh;
  z-index: 100;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`;

export const LogoContainer = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const LogoTitle = styled.h1`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledMenu = styled(Menu)`
  flex: 1;
  border-right: 0;
`;

export const ContentWrapper = styled(Layout)`
  margin-left: 200px;
  transition: margin-left 0.2s;
`;

export const StyledContent = styled(Content)`
  margin: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  min-height: calc(100vh - 48px);
`;
