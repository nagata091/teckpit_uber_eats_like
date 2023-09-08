import React from 'react';
// Modalは、Material UIではDialogというコンポーネントで実装する
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import styled from 'styled-components';

// components
import { SubText } from './StyledText';

// images
import OrderHeaderImage from '../images/order-header.png';


export const FoodModal = ({
  food,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <OrderHeader src={OrderHeaderImage} alt="order header" />
      <DialogTitle>
        {food.name}
      </DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>
            {food.description}
          </SubText>
        </DescriptionWrapper>
      </DialogContent>
      <DialogActions>
       {/* 数量を操作するアクションを入れる予定 */}
      </DialogActions>
    </Dialog>
  )
};

// styled-components
const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`
const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`
