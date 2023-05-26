import type { RadioChangeEvent } from 'antd';
import { Radio, Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useRequest } from 'umi';
import React, { useEffect, useState } from 'react';
import {
  getBussinessTypes,
  getProdscopenoList,
  getMaininfo,
  getLoginStatus,
  getProdscopenos,
} from '../service';
import styles from '../index.less';

type ScopeProps = {
  scopeItem: boolean[];
  scopeSubitem: CheckboxValueType[][];
  checkAll: (e: CheckboxChangeEvent, i: number) => void;
  checkSignal: (e: CheckboxValueType[], i: number) => void;
  data: ScopeItemType[];
};

type QualifyFormProps = {
  data: object[];
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

type initialData = {
  loginInfo: object;
  custInfo: object;
  scopeList: ScopeItemType[];
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

// line
const Line = () => {
  return <div className={styles.line} />;
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
const QualifyForm: React.FC<QualifyFormProps> = (props) => {
  return <></>;
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
  const [bussinessFormData, setBussinessFormData] = useState<object[]>([]);
  const [scopeFormData, setScopeFormData] = useState<object[]>([]);

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
        setData({
          loginInfo: response1.data,
          custInfo: response2.data,
          scopeList: response3.data,
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
          <QualifyForm data={bussinessFormData} />
        </>
      )}
    </div>
  );
};

export default Qualify;
