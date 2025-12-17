import { Button as AntButton, type ButtonProps as AntButtonProps } from "antd";

/**
 * 커스텀 Button 컴포넌트
 *
 * @example
 * <Button type="primary">클릭</Button>
 */
function Button(props: AntButtonProps) {
  return <AntButton {...props} />;
}

export { Button };
