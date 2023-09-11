import React from "react";
import styled from "styled-components";

// ベースとなるボタンスタイル
import { BaseButton } from "./shared_style";
import { RoundButton } from "./shared_style";

// constantsコンポーネント
import { FONT_SIZE } from "../style_constants";

export const CountUpButton = ({ onClick, isDisabled }) => {
  return (
    <RoundButton onClick={onClick} disabled={isDisabled}>
      ＋
    </RoundButton>  
  )
};

export const CountDownButton = ({ onClick, isDisabled }) => {
  return (
    <RoundButton onClick={onClick} disabled={isDisabled}>
      ー
    </RoundButton>  
  )
};

export const OrderButton = styled(BaseButton)`
  width: 390px;
  background-color: black;
  color: white;
  border-style: none;
  padding: 8px 16px;
  font-size: ${FONT_SIZE.BODY1};
`
