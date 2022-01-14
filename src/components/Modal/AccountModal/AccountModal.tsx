import { TextField } from '@mui/material';
import React, { FC, useRef, useState } from 'react';
import * as S from './style';
import { IEnvironmentFilter } from './../../../types/filter.types';

type AccountModalType = 'add' | 'modify' | 'detail';

interface Props {
  type: AccountModalType;
}

const getModalInfo = (type: AccountModalType) => {
  switch (type) {
    case 'add':
      return {
        title: '추가',
        buttonText: '추가',
        isAdd: true,
        isDetail: false,
      };
    case 'modify':
      return {
        title: '수정',
        buttonText: '수정',
        isAdd: false,
        isDetail: false,
      };
    case 'detail':
      return {
        title: '상세보기',
        buttonText: '닫기',
        isAdd: false,
        isDetail: true,
      };
  }
};

const AccountModal: FC<Props> = ({ type }) => {
  const [environments, setEnvironments] = useState<IEnvironmentFilter[]>([
    {
      id: 1,
      name: 'dv1',
    },
    {
      id: 2,
      name: 'st1',
    },
  ]);
  const { title, buttonText, isAdd, isDetail } = getModalInfo(type);

  return (
    <S.ModalContainer>
      <S.Title>{`계정 ${title}`}</S.Title>
      <S.EnvInput
        size='small'
        disablePortal
        id='combo-box-demo'
        options={environments.map(ele => ele.name)}
        disabled={!isAdd}
        renderInput={params => <TextField {...params} label='환경' variant='filled' />}
      />
      <S.AuthInputsContainer>
        <TextField disabled={isDetail} id='standard-basic' label='아이디' variant='filled' />
        <TextField disabled={isDetail} id='standard-basic' label='비밀번호' variant='filled' />
      </S.AuthInputsContainer>
      <textarea placeholder='상세 설명' disabled={isDetail} />
      <S.ButtonContainer>
        <button>{buttonText}</button>
      </S.ButtonContainer>
    </S.ModalContainer>
  );
};

export default AccountModal;
