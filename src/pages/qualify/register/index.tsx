import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';
import { Radio, Checkbox, Tabs } from 'antd';
import QualifyUploadComp from './components/UploadComp';
import styles from '../index.less';
import type { licenceFieldItemType } from '../data';
import type { RadioChangeEvent } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { SearchOutlined } from '@ant-design/icons';

import qualifyConfig from '../config.js';
import {
  getBussinessTypes,
  getProdscopenoList,
  getMaininfo,
  getLoginStatus,
  getProdscopenos,
  getLicenceField,
  getMustLicence,
} from '../service';

type lineProps = {
  type?: string;
};

type ScopeProps = {
  scopeItem: boolean[];
  scopeSubitem: CheckboxValueType[][];
  checkAll: (e: CheckboxChangeEvent, i: number) => void;
  checkSignal: (e: CheckboxValueType[], i: number) => void;
  data: ScopeItemType[];
};

type QualifyFormProps = {
  bussinessData: bussinessItemType[];
  scopeData?: object[];
  licenceFieldData: licenceFieldItemType[];
  title: string;
};

type QualifyFormItemProps = {
  licenceFieldItemData: licenceFieldItemType | undefined;
  item: bussinessItemType;
};

type BusinessesProps = {
  businessType: string;
  businessChange: (v: string) => void;
};

type ScopeItemType = {
  children: ScopeItemType[];
  disableCheckbox: boolean;
  key: string;
  leaf: boolean;
  parentKey: string;
  title: string;
};

type bussinessItemType = {
  licenceTypeId: string;
  licenceTypeName: string;
  [key: string]: any;
};

type initialData = {
  loginInfo: object;
  custInfo: object;
  scopeList: ScopeItemType[];
  licenceFieldData: licenceFieldItemType[];
  bussinessData: bussinessItemType[];
  scopeData?: object[];
};

export type scopeNoItemType = {
  createAt: number;
  deleteFlag: string;
  parentId: string;
  prodscopenoId: string;
  prodscopenoLevel: number;
  prodscopenoName: string;
  prodscopenoOrder: number;
  remark?: string;
  updateAt: number;
};

const { sketch_src, zzArr, zzConfig, preImageUrl } = qualifyConfig;

// 企业类型
const Businesses: React.FC<BusinessesProps> = (props) => {
  const { businessType, businessChange } = props;
  const { data } = useRequest(() => {
    return getBussinessTypes({
      dictKey: 'buyer_type',
    });
  });

  return (
    <Radio.Group
      onChange={({ target: { value } }: RadioChangeEvent) => businessChange(value)}
      value={businessType}
    >
      <span className={styles.itemTitle}>选择企业类型</span>
      {data?.map((item) => (
        <Radio value={item.dataKey} key={item.dataKey}>
          {item.dataValue}
        </Radio>
      ))}
    </Radio.Group>
  );
};

// 直线line
const Line: React.FC<lineProps> = (props) => {
  const { type = 'dashed' } = props;
  const style = {
    width: '100%',
    height: '1px',
    margin: '15px 0',
    borderBottom: `1px ${type} #ddd`,
  };
  return <div style={style} />;
};

// 经营范围
const Scope: React.FC<ScopeProps> = (props) => {
  const { scopeItem, scopeSubitem, checkAll, checkSignal, data } = props;

  return (
    <>
      <span className={styles.itemTitle}>选择经营范围</span>
      <table>
        <tbody>
          {data?.map((item, i) => (
            <tr key={item.key}>
              <td>
                <Checkbox onChange={(e) => checkAll(e, i)} value={item.key} checked={scopeItem[i]}>
                  {item.title}
                </Checkbox>
              </td>
              <td>
                <Checkbox.Group
                  onChange={(checkedValue) => checkSignal(checkedValue, i)}
                  value={scopeSubitem[i]}
                >
                  {item.children.map((sub) => (
                    <span key={sub.key} className={styles.checkboxWrapper}>
                      <Checkbox value={sub.key}>{sub.title}</Checkbox>
                    </span>
                  ))}
                </Checkbox.Group>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

// 证照部分

const QualifyFormItem: React.FC<QualifyFormItemProps> = (props) => {
  const { licenceFieldItemData, item } = props;
  licenceFieldItemData!.showErrorTip = false;
  return (
    <div className={styles.tabContent}>
      <div className={styles.tabContentTop}>
        <div className={styles.tabContentTopL}>
          <div>示意图</div>
          <div style={{ position: 'relative' }}>
            <img
              src={'/icons/zz/' + (sketch_src[item.licenceTypeName] || 'default.png')}
              alt=""
              className={styles.egImg}
            />
            <div className={styles.picPreviewBtnBox}>
              <SearchOutlined style={{ color: '#fff', fontSize: '18px' }} />
            </div>
          </div>
        </div>
        <div className={styles.tabContentTopR}>
          <div className={styles.uploadPictureDesc}>
            <div className={styles.uploadPictureText}>上传图片</div>
            {licenceFieldItemData?.canOcr && (
              <div className={styles.uploadPictureTextTip}>（自动识别）</div>
            )}
          </div>
          <QualifyUploadComp
            config={
              zzArr.includes(item.licenceTypeName)
                ? zzConfig[item.licenceTypeName]
                : zzConfig.defaultZZ
            }
            item={item}
          />
        </div>
      </div>
      <Line type="solid" />
      <div className={styles.tabContentBottom} />
    </div>
  );
};

const QualifyForm: React.FC<QualifyFormProps> = (props) => {
  const { bussinessData, licenceFieldData, title } = props;
  const [activeKey, setActiveKey] = useState<string>(bussinessData[0]?.licenceTypeId);
  const tabChange = (k: string) => {
    if (activeKey == k) return;
    setActiveKey(k);
  };
  return (
    <>
      <span className={styles.itemTitle}>{title}</span>
      <Tabs
        onChange={tabChange}
        className={styles.tabs}
        type="card"
        activeKey={activeKey}
        items={bussinessData.map((item) => {
          return {
            label: item.licenceTypeName,
            key: item.licenceTypeId,
            children: (
              <QualifyFormItem
                licenceFieldItemData={licenceFieldData.find(
                  (_) => _.licenceTypeId === item.licenceTypeId,
                )}
                item={item}
              />
            ),
          };
        })}
      />
    </>
  );
};

// 资质证照 page component
const Qualify = () => {
  const [businessType, setBusinessType] = useState<string>('1');
  const businessChange = (v: string) => {
    setBusinessType(v);
  };
  const [data, setData] = useState<initialData | null>(null);
  const [scopeItem, setScopeItem] = useState<boolean[]>([]);
  const [scopeSubitem, setScopeSubitem] = useState<CheckboxValueType[][]>([]);
  // const [bussinessFormData, setBussinessFormData] = useState<object[]>([]);
  // const [scopeFormData, setScopeFormData] = useState<object[]>([]);

  // 经营范围多选
  const checkAll: ScopeProps['checkAll'] = (e, i) => {
    let newSubItems: CheckboxValueType[][] = [];
    const newItems = scopeItem.map((item, idx) => {
      newSubItems = scopeSubitem.map((subItem, index) => {
        let subArr: string[] = [];
        if (i == index) {
          if (e.target.checked && data) {
            data.scopeList[i].children.forEach((o) => {
              subArr.push(o.key);
            });
          } else {
            subArr = [];
          }
          return subArr;
        } else return subItem;
      });
      if (i == idx) {
        return !item;
      } else return item;
    });
    setScopeItem(newItems);
    setScopeSubitem(newSubItems);
  };

  // 经营范围单选
  const checkSignal: ScopeProps['checkSignal'] = (e, i) => {
    let newItems: boolean[] = [];
    const newSubItems: CheckboxValueType[][] = scopeSubitem.map((subItem, index) => {
      if (i == index && data) {
        newItems = scopeItem.map((item, idx) => {
          if (e.length == data.scopeList[i].children.length && i == idx) {
            return true;
          } else if (e.length != data.scopeList[i].children.length && i == idx) {
            return false;
          } else return item;
        });
        return e;
      } else return subItem;
    });
    setScopeItem(newItems);
    setScopeSubitem(newSubItems);
  };

  // 回显经营范围
  const backShowSelectedBusinessScope = (
    source: ScopeItemType[],
    saveedData: scopeNoItemType[],
  ) => {
    const arr: boolean[] = [];
    const subArr: CheckboxValueType[][] = [];
    source.forEach((item, i) => {
      subArr[i] = [];
      item.children.forEach((subitem) => {
        saveedData.forEach((it) => {
          if (subitem.key == it.prodscopenoId) {
            subArr[i].push(subitem.key);
          }
        });
      });
      if (subArr[i].length > 0 && item.children.length == subArr[i].length) {
        arr[i] = true;
      } else arr[i] = false;
    });
    setScopeItem(arr);
    setScopeSubitem(subArr);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await getLoginStatus();
        const response2 = await getMaininfo();
        const response3 = await getProdscopenoList();
        const response4 = await getProdscopenos({ custApplyId: '' });
        const response5 = await getLicenceField();
        const response6 = await getMustLicence({ custType: '1' });
        setData({
          loginInfo: response1.data,
          custInfo: response2.data,
          scopeList: response3.data,
          licenceFieldData: response5.data ? response5.data : [],
          bussinessData: response6.data ? response6.data : [],
        });
        backShowSelectedBusinessScope(response3.data, response4.data ? response4.data : []);
      } catch (error) {}
    }
    fetchData();
    return () => {
      setData(null);
    };
  }, []);

  return (
    <div className={styles.page}>
      {data && (
        <>
          <Businesses businessType={businessType} businessChange={businessChange} />
          <Line />
          <Scope
            scopeItem={scopeItem}
            scopeSubitem={scopeSubitem}
            checkAll={checkAll}
            checkSignal={checkSignal}
            data={data.scopeList}
          />
          <Line />
          <QualifyForm
            bussinessData={data.bussinessData}
            licenceFieldData={data.licenceFieldData}
            title="上传企业资质证照"
          />
          <Line />
        </>
      )}
    </div>
  );
};

export default Qualify;
