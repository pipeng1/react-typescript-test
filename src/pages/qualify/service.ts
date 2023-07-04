// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import {
  BusinessItemDataType,
  ScopeItemDataType,
  scopeNoItemType,
  licenceFieldItemType,
  bussinessItemType,
} from './data';

const authHeader = { Authorization: '1658304497329782787_4e0f84108a9a467f9fb01b7981a2c75c' };
/** 获取企业类型 GET /api/b2b/user/dict/getDict?dictKey=buyer_type */
export async function getBussinessTypes(
  params: {
    // query
    dictKey?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: BusinessItemDataType[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/sypt/api/b2b/user/dict/getDict', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取企业所有经营范围 GET api/b2b/user/supplier/prodscopenoList */
export async function getProdscopenoList(options?: { [key: string]: any }) {
  return request<{
    data: ScopeItemDataType[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/sypt/api/b2b/user/supplier/prodscopenoList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户登录信息 get /api/b2b/user/loginStatus */
export async function getLoginStatus(options?: { [key: string]: any }) {
  return request<{
    data: object;
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/sypt/api/b2b/user/loginStatus', {
    method: 'GET',
    headers: authHeader,
    ...(options || {}),
  });
}

/** 获取买家用户信息 get /api/b2b/user/buyer/getMainInfo?custId=1658304497329782786 pp0020*/
export async function getMaininfo(
  params?: {
    // query
    custId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: object;
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/sypt/api/b2b/user/buyer/getMainInfo?custId=1658304497329782786', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取已选经营范围 /api/b2b/user/buyer/getProdscopenos.json?custApplyId= */
export async function getProdscopenos(
  params?: {
    // query
    custApplyId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data?: scopeNoItemType[] | null;
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/sypt/api/b2b/user/buyer/getProdscopenos.json', {
    method: 'GET',
    headers: authHeader,
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取证照配置字段 */
export async function getLicenceField(
  params?: {
    // query
  },
  options?: { [key: string]: any },
) {
  return request<{
    data?: licenceFieldItemType[] | null;
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/sypt/api/b2b/licence/queryLicenceField', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 获取经营证照 */
export async function getMustLicence(
  params?: {
    // query
    custType: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data?: bussinessItemType[] | null;
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }>('/sypt/api/b2b/user/api/buyer/getMustLicence?', {
    method: 'GET',
    headers: authHeader,
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
