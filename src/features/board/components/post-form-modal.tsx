/**
 * PostFormModal - 게시글 작성/수정 모달
 */

import { Modal, Form, Input, Select, Tag } from "antd";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BoardQueries } from "@/modules/queries/board-queries";

const { TextArea } = Input;

interface PostFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  postId?: string;
  onCancel: () => void;
  onSubmit: (data: Board.CreatePostParams) => void;
  loading?: boolean;
}

export function PostFormModal({
  open,
  mode,
  postId,
  onCancel,
  onSubmit,
  loading,
}: PostFormModalProps): React.ReactElement {
  const [formData, setFormData] = useState<Board.CreatePostParams>({
    title: "",
    body: "",
    category: "FREE",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");

  // 수정 모드일 때만 게시글 상세 조회
  const { data: post, isLoading: isLoadingPost } = useQuery({
    ...BoardQueries.queryPost(postId!),
    enabled: mode === "edit" && !!postId && open,
  });

  // 모달이 열릴 때 폼 초기화 또는 데이터 로드
  useEffect(() => {
    if (open) {
      if (mode === "create") {
        // 생성 모드: 폼 초기화
        setFormData({
          title: "",
          body: "",
          category: "FREE",
          tags: [],
        });
        setTagInput("");
      } else if (mode === "edit" && post) {
        // 수정 모드: 불러온 데이터로 폼 채우기
        setFormData({
          title: post.title,
          body: post.body,
          category: post.category,
          tags: post.tags,
        });
        setTagInput("");
      }
    }
  }, [open, mode, post]);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !(formData.tags ?? []).includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags ?? []), tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: (prev.tags ?? []).filter((t) => t !== tag),
    }));
  };

  return (
    <Modal
      open={open}
      title={mode === "create" ? "새 글 작성" : "게시글 수정"}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={mode === "create" ? "작성" : "수정"}
      cancelText="취소"
      confirmLoading={loading}
      width={600}
    >
      <Form layout="vertical">
        <Form.Item label="제목" required>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="제목을 입력하세요"
            disabled={isLoadingPost}
          />
        </Form.Item>

        <Form.Item label="카테고리" required>
          <Select
            value={formData.category}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
            options={[
              { label: "공지사항", value: "NOTICE" },
              { label: "Q&A", value: "QNA" },
              { label: "자유게시판", value: "FREE" },
            ]}
            disabled={isLoadingPost}
          />
        </Form.Item>

        <Form.Item label="본문" required>
          <TextArea
            value={formData.body}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, body: e.target.value }))
            }
            placeholder="본문을 입력하세요"
            rows={6}
            disabled={isLoadingPost}
          />
        </Form.Item>

        <Form.Item label="태그">
          <div style={{ marginBottom: 8 }}>
            {(formData.tags ?? []).map((tag) => (
              <Tag
                key={tag}
                closable
                onClose={() => handleRemoveTag(tag)}
                style={{ marginBottom: 4 }}
              >
                {tag}
              </Tag>
            ))}
          </div>
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onPressEnter={handleAddTag}
            placeholder="태그 입력 후 Enter"
            disabled={isLoadingPost}
          />
        </Form.Item>

        {isLoadingPost && (
          <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
            게시글 데이터를 불러오는 중...
          </div>
        )}
      </Form>
    </Modal>
  );
}
