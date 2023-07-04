export type BusinessItemDataType = {
  createAt: string;
  dataId: string;
  dataKey: string;
  dataValue: string;
  deleteFlag: string;
  dictId: string;
  keyword?: string | null;
  note: string;
  parentKey: string;
  treeLeaf: string;
  treeSort: number;
  updateAt: string;
};

export type ScopeItemDataType = {
  children: ScopeItemDataType[];
  disableCheckbox: boolean;
  key: string;
  leaf: boolean;
  parentKey: string;
  title: string;
};

export type scopeNoItemType = {
  createAt: number;
  deleteFlag: string;
  parentId: string;
  prodscopenoId: string;
  prodscopenoLevel: number;
  prodscopenoName: string;
  prodscopenoOrder: number;
  remark: string;
  updateAt: number;
};
export type licenceFieldItemType = {
  canOcr: boolean;
  data: object[];
  isLongUse: string;
  licenceTypeId: string;
  licenceTypeName: string;
  [key: string]: any;
};

export type bussinessItemType = {
  licenceTypeId: string;
  licenceTypeName: string;
  [key: string]: any;
};
