import React, { FC, useState } from "react";
import styled from "@emotion/styled";

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  position: "relative", // Allow for absolute positioning of delete button
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
  marginRight: "auto", // Allow the label to take up available space
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

const DeleteButton = styled.button({
  position: "absolute",
  right: 16, // Position the "X" after the label
  background: "transparent",
  border: "none",
  color: "red",
  fontSize: 16,
  cursor: "pointer",
  opacity: 1,
  transition: "opacity 0.2s",
});

export interface TodoItemProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onDelete?: (id: string) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  id,
  label,
  checked = false,
  onChange,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Wrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Label checked={checked}>{label}</Label>
      {isHovered && <DeleteButton onClick={() => onDelete(id)}>X</DeleteButton>}
    </Wrapper>
  );
};
