import { IAccount } from "../../types/account.types";
import { PlatformLabel, EnvironmentLabel } from "../../style/Labels";
import { FaClipboard, FaPen, FaTrash } from 'react-icons/fa';
import { IoArrowRedo } from 'react-icons/io5';
import { Row, RowButton } from "../../style/Row";
import * as S from "./style";

const AccountRow = ({userId, platform, environment}: IAccount): JSX.Element => {
    return (
        <Row>
            <S.EnvironmentWrapper type="row"><EnvironmentLabel>{environment}</EnvironmentLabel></S.EnvironmentWrapper>
            <S.PlatformWrapper type="row"><PlatformLabel type={platform}>{platform}</PlatformLabel></S.PlatformWrapper>
            <S.UserIdWrapper type="row">{userId}</S.UserIdWrapper>

            <S.ButtonWrapper>
                <RowButton><FaPen /></RowButton>
                <RowButton><FaTrash /></RowButton>
                <RowButton><IoArrowRedo /></RowButton>
                <RowButton><FaClipboard /></RowButton>
            </S.ButtonWrapper>
        </Row>
    )
}

export default AccountRow;