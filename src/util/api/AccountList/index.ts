import instance from './../Default/index';
import { Account } from './../../../types/account.types';

interface AccountListResponse {
  data: Account[];
  totalPages: number;
}

export const getAccountList = async (
  page: number,
  platform?: string | null,
  environment?: string,
) => {
  try {
    const params = { page, platform, size: 7, environment };
    return await instance.get<AccountListResponse>(`/accounts`, { params });
  } catch (error) {
    throw error;
  }
};
