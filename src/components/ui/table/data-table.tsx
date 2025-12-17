"use client";

/**
 * DataTable - TanStack Table + Ant Design 기반 테이블 컴포넌트
 *
 * @features
 * - 컬럼 너비 조절 (드래그 리사이즈)
 * - 컬럼 숨김/보임 토글
 * - Ant Design 스타일 적용
 */

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  ColumnResizeMode,
  VisibilityState,
  Header,
} from "@tanstack/react-table";
import { Table as AntTable, Checkbox, Dropdown, Button, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import styled from "styled-components";

// 스타일 정의
const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #f0f0f0;
  background: #fff;

  th,
  td {
    padding: 12px 16px;
    border: 1px solid #f0f0f0;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  th {
    background: #fafafa;
    font-weight: 500;
    position: relative;
    user-select: none;
  }

  tr:hover td {
    background: #fafafa;
  }
`;

const ResizeHandle = styled.div<{ $isResizing: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background: ${(props) => (props.$isResizing ? "#1890ff" : "transparent")};
  cursor: col-resize;
  user-select: none;
  touch-action: none;

  &:hover {
    background: #1890ff;
  }
`;

const ToolbarContainer = styled.div`
  margin-bottom: 16px;
`;

// Props 타입
interface DataTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  showColumnToggle?: boolean;
}

export function DataTable<T extends object>({
  data,
  columns,
  showColumnToggle = true,
}: DataTableProps<T>): React.ReactElement {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnResizeMode] = useState<ColumnResizeMode>("onChange");

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
  });

  // 컬럼 토글 메뉴
  const columnMenuItems: MenuProps["items"] = table
    .getAllLeafColumns()
    .map((column) => ({
      key: column.id,
      label: (
        <Checkbox
          checked={column.getIsVisible()}
          onChange={(e) => column.toggleVisibility(e.target.checked)}
        >
          {column.id}
        </Checkbox>
      ),
    }));

  return (
    <div>
      {showColumnToggle && (
        <ToolbarContainer>
          <Dropdown menu={{ items: columnMenuItems }} trigger={["click"]}>
            <Button icon={<SettingOutlined />}>컬럼 설정</Button>
          </Dropdown>
        </ToolbarContainer>
      )}
      <TableContainer>
        <StyledTable style={{ width: table.getCenterTotalSize() }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    <ResizeHandle
                      $isResizing={header.column.getIsResizing()}
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ width: cell.column.getSize() }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
}
