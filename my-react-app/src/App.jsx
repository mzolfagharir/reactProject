import { useState, useEffect } from 'react';
import { Button, Space, Table } from 'antd';
import LinearChart from './LinearChart';
import CircularChart from './CircularChart';
import jsonData from './data.json';
document.title = 'سامانه مدیریت مشتریان';
const App = () => {
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});
  const [columnSorters, setColumnSorters] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const generateFilterOptions = (columnName) => {
    const uniqueValues = [...new Set(data.map((item) => item[columnName]))];
    return uniqueValues.map((value) => ({
      text: value.toString(),
      value,
    }));
  };

  const handleChange = (pagination, filters, sorter) => {
    if (sorter && sorter.columnKey) {
      setColumnSorters({ ...columnSorters, [sorter.columnKey]: sorter });
    }
    if (filters) {
      setColumnFilters({ ...columnFilters, ...filters });
    }

    //sorting logic
    const sortedData = [...data];
    if (sorter && sorter.columnKey) {
      sortedData.sort((a, b) => {
        const key = sorter.columnKey;
        const sortOrder = sorter.order === 'ascend' ? 1 : -1;

        if (key === 'date') {
          // Convert date strings to Date objects for proper sorting
          return sortOrder * (new Date(a[key]) - new Date(b[key]));
        } else if (key === 'qty' || key === 'amount') {
          return sortOrder * (parseFloat(a[key]) - parseFloat(b[key]));
        } else {
          return sortOrder * a[key].localeCompare(b[key]);
        }
      });
    }

    setData(sortedData);
  };

  const columns = [
    {
      title: 'تاریخ',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      sortOrder: columnSorters.date ? columnSorters.date.order : null,
      filteredValue: columnFilters.date || null,
      onFilter: (value, record) => record.date.includes(value),
      filters: generateFilterOptions('date'),
      ellipsis: true,
    },
    {
      title: 'نام بانک',
      dataIndex: 'bank',
      key: 'bank',
      sorter: true,
      sortOrder: columnSorters.bank ? columnSorters.bank.order : null,
      filteredValue: columnFilters.bank || null,
      onFilter: (value, record) => record.bank.includes(value),
      filters: generateFilterOptions('bank'),
      ellipsis: true,
    },
    {
      title: 'تعداد',
      dataIndex: 'qty',
      key: 'qty',
      sorter: true,
      sortOrder: columnSorters.qty ? columnSorters.qty.order : null,
      filteredValue: columnFilters.qty || null,
      onFilter: (value, record) => record.qty.includes(value),
      filters: generateFilterOptions('qty'),
      ellipsis: true,
    },
    {
      title: 'مبلغ',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      sortOrder: columnSorters.amount ? columnSorters.amount.order : null,
      filteredValue: columnFilters.amount || null,
      onFilter: (value, record) => record.amount.includes(value),
      filters: generateFilterOptions('amount'),
      ellipsis: true,
    },
  ];

  return (
    <div style={{ direction: 'rtl', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '20px' }}>سامانه مدیریت مشتریان</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
      <div style={{ marginTop: '20px', display: 'inline-block' }}>
        <LinearChart data={data} />
      </div>
      <div style={{ marginTop: '20px', display: 'inline-block' }}>
        <CircularChart data={data} />
      </div>
    </div>
  );
};

export default App;
