/**
 * PostFormModal - 게시글 작성/수정 모달
 */

import { Modal, Form, Input, Select, Tag } from "antd";
import { useState } from "react";

const { TextArea } = Input;

interface PostFormModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialData?: Board.Post;
  onCancel: () => void;
  onSubmit: (data: Board.CreatePostParams) => void;
  loading?: boolean;
}

export function PostFormModal({
  open,
  mode,
  initialData,
  onCancel,
  onSubmit,
  loading,
}: PostFormModalProps): React.ReactElement {
  const [formData, setFormData] = useState<Board.CreatePostParams>({
    title: initialData?.title || "",
    body: initialData?.body || "",
    category: initialData?.category || "FREE",
    tags: initialData?.tags || [],
  });

  const [tagInput, setTagInput] = useState("");

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
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
