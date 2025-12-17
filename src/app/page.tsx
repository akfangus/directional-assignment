"use client";

import { useState } from "react";
import { Button, Card, Space, Typography } from "antd";
import styled from "styled-components";
import { useCounterStore } from "@/stores/example-store";
import { useExampleQuery } from "@/hooks/use-example-query";

const { Title, Paragraph } = Typography;

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(to bottom, #f0f2f5, #ffffff);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

export default function Home() {
  const { count, increment, decrement, reset } = useCounterStore();
  const { data, isLoading, refetch } = useExampleQuery();
  const [showAdvice, setShowAdvice] = useState(false);

  return (
    <Container>
      <Content>
        <Title level={1}>Next.js 프로젝트 템플릿</Title>
        <Paragraph>
          Next.js 15, React 19, TanStack Query v5, Zustand, Styled Components,
          Ant Design v5
        </Paragraph>

        <StyledCard title="Zustand 상태 관리 예제">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={3}>카운터: {count}</Title>
            <Space>
              <Button type="primary" onClick={increment}>
                증가
              </Button>
              <Button onClick={decrement}>감소</Button>
              <Button danger onClick={reset}>
                리셋
              </Button>
            </Space>
          </Space>
        </StyledCard>

        <StyledCard title="TanStack Query 데이터 페칭 예제">
          <Space direction="vertical" style={{ width: "100%" }}>
            {isLoading ? (
              <Paragraph>로딩 중...</Paragraph>
            ) : (
              <>
                <Paragraph>
                  <strong>조언:</strong> {data?.slip.advice}
                </Paragraph>
                <Button type="primary" onClick={() => refetch()}>
                  새로운 조언 가져오기
                </Button>
              </>
            )}
          </Space>
        </StyledCard>

        <StyledCard title="Styled Components + Ant Design">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Paragraph>
              이 카드는 Ant Design의 Card 컴포넌트에 Styled Components로 커스텀
              스타일을 적용한 예제입니다.
            </Paragraph>
            <Button type="dashed" onClick={() => setShowAdvice(!showAdvice)}>
              {showAdvice ? "숨기기" : "팁 보기"}
            </Button>
            {showAdvice && (
              <Paragraph type="success">
                ✨ Styled Components와 Ant Design을 함께 사용하면 일관된 디자인
                시스템을 유지하면서도 필요한 부분만 커스터마이징할 수 있습니다.
              </Paragraph>
            )}
          </Space>
        </StyledCard>
      </Content>
    </Container>
  );
}
