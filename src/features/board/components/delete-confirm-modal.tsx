/**
 * DeleteConfirmModal - 삭제 확인 모달
 */

import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface DeleteConfirmModalProps {
  open: boolean;
  post: Post.Post | null;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function DeleteConfirmModal({
  open,
  post,
  onConfirm,
  onCancel,
  loading,
}: DeleteConfirmModalProps): React.ReactElement {
  return (
    <Modal
      open={open}
      title={
        <span>
          <ExclamationCircleOutlined
            style={{ color: "#ff4d4f", marginRight: 8 }}
          />
          게시글 삭제
        </span>
      }
      onOk={onConfirm}
      onCancel={onCancel}
      okText="삭제"
      cancelText="취소"
      okButtonProps={{ danger: true }}
      confirmLoading={loading}
    >
      <p>정말 이 게시글을 삭제하시겠습니까?</p>
      {post && (
        <p style={{ color: "#666" }}>
          <strong>{post.title}</strong>
        </p>
      )}
      <p style={{ color: "#ff4d4f", fontSize: "12px" }}>
        삭제된 게시글은 복구할 수 없습니다.
      </p>
    </Modal>
  );
}
