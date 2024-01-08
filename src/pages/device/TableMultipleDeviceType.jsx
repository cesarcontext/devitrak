import { useContext, useEffect, useRef, useState, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Popconfirm, Table, Tooltip } from "antd";
import {
  onEditNumberInRowInMultipleDeviceType,
  onRemoveDeviceFromMultipleDeviceType,
} from "../../store/slides/deviceSlides";
import { Icon } from "@iconify/react";
const EditableContext = createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const TableMultipleDeviceType = () => {
  const { multipleDeviceSelection } = useSelector(
    (state) => state.deviceHandler
  );
  const [dataSource, setDataSource] = useState(
    multipleDeviceSelection?.map(
      ({ deviceType, deviceNeeded }, index) => {
        return {
          key: index,
          deviceType,
          deviceNeeded,
        };
      }
    )
  );
  console.log("🚀 ~ file: TableMultipleDeviceType.jsx:101 ~ TableMultipleDeviceType ~ dataSource:", dataSource)
  const dispatch = useDispatch();
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    dispatch(onRemoveDeviceFromMultipleDeviceType(newData));
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "Device type",
      dataIndex: "deviceType",
      width: "70%",
    },
    {
      title: "Qty",
      dataIndex: "deviceNeeded",
      width: "30%",
      editable: true,
      render: (deviceNeeded) => (
        <span>
          <Tooltip title="Click to edit number">{deviceNeeded}</Tooltip>
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Icon icon="bi:trash" width={"20"} height={"20"} color="#e65d5d" />
          </Popconfirm>
        ) : null,
    },
  ];
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    dispatch(onEditNumberInRowInMultipleDeviceType(newData));
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  return (
    <Table
      size="large"
      components={components}
      rowClassName={() => "editable-row"}
      //   bordered
      dataSource={dataSource}
      columns={columns}
    />
  );
};
export default TableMultipleDeviceType;
