import styled from 'styled-components';

function getWrapperStyle(type: 'header' | 'row') {
  return type === 'header'
    ? `
        font-weight: bold;
    `
    : `
        color: #494949;
    `;
}

export const EnvironmentWrapper = styled.div<{ type: 'header' | 'row' }>`
  width: 10%;
  ${({ type }) => getWrapperStyle(type)}
`;

export const PlatformWrapper = styled.div<{ type: 'header' | 'row' }>`
  width: 15%;
  ${({ type }) => getWrapperStyle(type)}
`;

export const UserIdWrapper = styled.div<{ type: 'header' | 'row' }>`
  width: 50%;
  height: 100%;
  ${({ type }) => getWrapperStyle(type)};
  cursor: pointer;
`;

export const ButtonWrapper = styled.div`
  float: right;
  gap: 10px;

  > button {
    cursor: pointer;
  }
`;
