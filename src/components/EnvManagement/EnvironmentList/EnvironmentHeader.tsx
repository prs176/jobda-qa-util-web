import { Row } from '../../../style/Row';
import * as S from './style';

const EnvironmentHeader = (): JSX.Element => {
  return (
    <Row>
      <S.EnvironmentWrapper type='header'>환경</S.EnvironmentWrapper>
      <S.PlatformWrapper type='header'>서비스</S.PlatformWrapper>
      <S.ClientDomainWrapper type='header'>클라이언트 도메인</S.ClientDomainWrapper>
      <S.ServerDomainWrapper type='header'>서버 도메인</S.ServerDomainWrapper>

      <S.ButtonWrapper>
        <div>수정</div>
        <div>삭제</div>
      </S.ButtonWrapper>
    </Row>
  );
};

export default EnvironmentHeader;
