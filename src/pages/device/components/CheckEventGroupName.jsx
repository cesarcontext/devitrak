import { Grid } from "@mui/material";
import { AutoComplete, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { devitrackApi } from "../../../devitrakApi";
import { useState } from "react";
import { onAddConsumerInfo } from '../../../store/slides/consumerSlide'
const CheckEventGroupName = ({ openModal, setOpenModal }) => {
  const { consumer } = useSelector((state) => state.consumer);
  const [value, setValue] = useState(consumer?.groupName?.at(-1) ?? "");
  const dispatch = useDispatch();
  const sanitizingEventGroupName = (eventGroupName) => {
    const check = new Map();
    for (let data of eventGroupName) {
      if (!check.has(data)) {
        check.set(data, data);
      }
    }
    return Array.from(check.values());
  };

  const styleH4 = {
    color: "var(--gray-900, #101828)",
    fontFamily: "Inter",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "32px",
    padding: "25px 0px 10px 0px",
  };

  const closeModal = () => {
    return setOpenModal(false);
  };
  const onSelect = (data) => {
    return setValue(data);
  };
  const updateGroupName = async (event) => {
    event.preventDefault();
    const updateList = [...consumer.groupName, String(value).toLowerCase()];
    const response = await devitrackApi.patch(`/auth/${consumer.id}`, {
      groupName: updateList,
    });
    if (response.data) {
      dispatch(
        onAddConsumerInfo({
          ...consumer,
          groupName: updateList,
        })
      );
      return closeModal();
    }
  };
  const data = consumer?.groupName ?? []
  return (
    <Modal
      open={openModal}
      onCancel={() => closeModal()}
      footer={[]}
      centered
      maskClosable={false}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h4 style={styleH4}>Event Group Name</h4>
          <AutoComplete
            value={value}
            options={sanitizingEventGroupName(data).map(
              (item) => {
                return { value: item };
              }
            )}
            style={{
              width: "100%",
            }}
            onSelect={onSelect}
            onChange={(value) => setValue(value)}
            filterOption={(inputValue, option) =>
              String(option.value)
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </Grid>
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"5px"}
          item
          xs={12}
        >
          <button className="blueButton" onClick={(e) => updateGroupName(e)}>
            <p className="blueButtonText">Confirm</p>
          </button>
          <button className="grayButton" onClick={() => closeModal()}>
            <p className="grayButtonText">Close</p>
          </button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default CheckEventGroupName;
