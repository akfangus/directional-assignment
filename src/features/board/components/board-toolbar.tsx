/**
 * BoardToolbar - 검색, 정렬, 필터, 새 글 작성 버튼
 */

import { Input, Select, Button, Space, Tag } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Search } = Input;

interface BoardToolbarProps {
  searchValue: string;
  sortValue: string;
  orderValue: Board.OrderType;
  categoryValue?: Board.Category;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onSortChange: (value: string) => void;
  onOrderChange: (value: Board.OrderType) => void;
  onCategoryChange: (value?: Board.Category) => void;
  onCreateClick: () => void;
}

export function BoardToolbar({
  searchValue,
  sortValue,
  orderValue,
  categoryValue,
  onSearchChange,
  onSearchSubmit,
  onSortChange,
  onOrderChange,
  onCategoryChange,
  onCreateClick,
}: BoardToolbarProps): React.ReactElement {
  return (
    <ToolbarContainer>
      <LeftSection>
        <Search
          placeholder="제목 또는 본문 검색"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onSearch={onSearchSubmit}
          style={{ width: 300 }}
          prefix={<SearchOutlined />}
        />

        <Space>
          <Select
            value={sortValue}
            onChange={onSortChange}
            style={{ width: 120 }}
            options={[
              { label: "제목순", value: "title" },
              { label: "작성일순", value: "createdAt" },
            ]}
          />

          <Select
            value={orderValue}
            onChange={onOrderChange}
            style={{ width: 100 }}
            options={[
              { label: "오름차순", value: "asc" },
              { label: "내림차순", value: "desc" },
            ]}
          />
        </Space>

        <Space>
          <CategoryButton
            type={!categoryValue ? "primary" : "default"}
            onClick={() => onCategoryChange(undefined)}
          >
            전체
          </CategoryButton>
          <CategoryButton
            type={categoryValue === "NOTICE" ? "primary" : "default"}
            onClick={() => onCategoryChange("NOTICE")}
          >
            공지사항
          </CategoryButton>
          <CategoryButton
            type={categoryValue === "QNA" ? "primary" : "default"}
            onClick={() => onCategoryChange("QNA")}
          >
            Q&A
          </CategoryButton>
          <CategoryButton
            type={categoryValue === "FREE" ? "primary" : "default"}
            onClick={() => onCategoryChange("FREE")}
          >
            자유게시판
          </CategoryButton>
        </Space>
      </LeftSection>

      <RightSection>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreateClick}>
          새 글 작성
        </Button>
      </RightSection>
    </ToolbarContainer>
  );
}

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  flex-wrap: wrap;
  gap: 16px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryButton = styled(Button)`
  min-width: 80px;
`;
