import React, { useState, useEffect, useReducer } from 'react';
import * as S from './style';
import StyledPagination from '../../Public/PaginationButton/PaginationButton';
import { ListWrapper, PaginationtWrapper, SectionWrapper } from '../../../style/Section';
import { setting } from '../../../assets/Main';
import { Account, AccountStateInterface } from './../../../types/account.types';
import useModal from '../../../hooks/useModal';
import { AccountModalType } from '../../../types/modal.types';
import { Modal } from '@mui/material';
import { ModalWrapper } from '../../../style/Modal';
import { getAccountList } from './../../../util/api/Account/index';
import { Platform } from '../../../lib/enum/platform';
import useAutoLogin from './../../../hooks/useAutoLogin';
import { accountReducer } from '../../../hooks/useAccountReducer';
import { PublicTab } from '../../Public';
import { AccountModal, CopyModal, DeleteModal } from '../../Modal';
import { AccountHeader, AccountRow, MainFilter } from '..';

const initialState: AccountStateInterface = {
  filters: [],
  currentPage: 1,
  tabNumber: 0,
};

const MainSection = () => {
  const [pageCount, setPageCount] = useState(1);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account>({
    id: 1,
    accountId: '',
    password: '',
    platform: Platform.JOBDA,
    environment: '',
  });
  const { isOpenModal, toggleIsOpenModal } = useModal();
  const [modalType, setModalType] = useState<AccountModalType>('modify');
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const { filters, currentPage, tabNumber } = state;

  const { autoLogin } = useAutoLogin();

  const getAccounts = async () => {
    try {
      let platform;
      switch (tabNumber) {
        case 0:
          platform = null;
          break;
        case 1:
          platform = 'JOBDA';
          break;
        case 2:
          platform = 'JOBDA_CMS';
      }
      const environment = filters?.map(ele => ele.id).join(',');
      const res = await getAccountList(currentPage - 1, platform, environment);
      setAccounts(res.data.data);
      setPageCount(res.data.totalPages);
    } catch (err) {
      throw err;
    }
  };

  const pageHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({
      type: 'CHANGE_PAGE',
      payload: {
        value,
      },
    });
  };

  useEffect(() => {
    getAccounts();
  }, [currentPage, filters, tabNumber]);

  return (
    <SectionWrapper>
      <div>
        <S.Header>
          <PublicTab tabNumber={tabNumber} dispatch={dispatch} />
          <S.EnvBtn to='/env-management'>
            <img src={setting} alt='' />
            <span>환경 관리</span>
          </S.EnvBtn>
        </S.Header>
        {tabNumber !== 0 && (
          <MainFilter filters={filters} dispatch={dispatch} tabNumber={tabNumber} />
        )}
        <ListWrapper>
          <AccountHeader />
          <hr />
          {accounts.map(account => (
            <div key={account.id}>
              <AccountRow
                account={account}
                setModalType={setModalType}
                autoLogin={() => {
                  autoLogin(account.id);
                }}
                toggleIsOpenModal={() => {
                  setSelectedAccount(account);
                  toggleIsOpenModal();
                }}
              />
              <hr />
            </div>
          ))}
        </ListWrapper>
      </div>

      <PaginationtWrapper>
        <StyledPagination page={currentPage} onChange={pageHandler} count={pageCount} />
      </PaginationtWrapper>

      <Modal open={modalType === 'detail' && isOpenModal} onClose={toggleIsOpenModal}>
        <ModalWrapper>
          <AccountModal
            getAccounts={getAccounts}
            id={selectedAccount.id}
            type='detail'
            onClose={toggleIsOpenModal}
          />
        </ModalWrapper>
      </Modal>

      <Modal open={modalType === 'modify' && isOpenModal} onClose={toggleIsOpenModal}>
        <ModalWrapper>
          <AccountModal
            getAccounts={getAccounts}
            id={selectedAccount.id}
            onClose={toggleIsOpenModal}
            type='modify'
          />
        </ModalWrapper>
      </Modal>

      <Modal open={modalType === 'delete' && isOpenModal} onClose={toggleIsOpenModal}>
        <ModalWrapper>
          <DeleteModal
            getAccounts={getAccounts}
            id={selectedAccount.id}
            type='account'
            onClose={toggleIsOpenModal}
          />
        </ModalWrapper>
      </Modal>

      <Modal open={modalType === 'copy' && isOpenModal} onClose={toggleIsOpenModal}>
        <ModalWrapper>
          <CopyModal id={selectedAccount.id} onClose={toggleIsOpenModal} />
        </ModalWrapper>
      </Modal>
    </SectionWrapper>
  );
};

export default MainSection;
