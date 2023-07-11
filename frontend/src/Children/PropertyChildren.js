import React, { useEffect, useState } from "react";

import baseApi from "../Utils/Axios";
import UseRentOrNot from "../hooks/RentOrNot";
import { useSigner } from "wagmi";
import PropertyContext from "../ContextApi/PropertyContext";
import UseGetRentInfo from "../hooks/GetRentInfo";
import ContractRead from "../hooks/GetBalance";
import UseGetIndvProperty from "../hooks/GetProperties";
const PropertyHandler = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [rentPost, setRentPost] = React.useState([]);
  const [salePost, setSalePost] = useState([]);
  const [myHome, setMyHome] = useState([]);
  const [government, setGovernment] = useState([]);
  const [posts, setPost] = useState([]);
  const { RentOrNot } = UseRentOrNot();
  const { data } = useSigner();
  const { GetRentInfo } = UseGetRentInfo();

  const { getBalance } = ContractRead();
  const { GetIndvProperty } = UseGetIndvProperty();

  const CheckForBlance = async (_data, indvArray) => {
    let res = 0;

    res = await getBalance(_data.index, data._address);

    if (Number(res) > 0) {
      indvArray.push(_data);
      console.log("Res", Number(res), _data);
    }

    res = await GetIndvProperty(_data.index);
    return [Number(res.leftAmount)];
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!data) return;

      setLoading(() => true);
      try {
        const res = await baseApi.get(`/post`, {});
        const { content } = res.data;
        const _rentPost = [];
        const _salePost = [];
        const _indvPost = [];
        for (let i = 0; i < content.length; i++) {
          try {
            const data2 = await RentOrNot(content[i].index, content[i]);
            const [leftAmount] = await CheckForBlance(
              content[i],
              _indvPost
            );

            if (data2) {
              const rentInfo = await GetRentInfo(content[i].index);

              const timestampInSeconds = Math.floor(Date.now() / 1000);
              console.log(
                "Count , data , rentEnded",
                content[i],
                Number(rentInfo.rent_ended),
                timestampInSeconds,
                rentInfo.renter
              );
              if (
                Number(rentInfo.rent_ended) > timestampInSeconds
              ) {
                if (rentInfo.renter === data._address) {
                  _indvPost.push({ ...content[i] });
                }
              } else {
                _rentPost.push(content[i]);
              }
            } else {
              leftAmount > 0 && _salePost.push(content[i]);
            }
          } catch (error) {
            console.log("Error", error);
          }
        }
        setRentPost(() => _rentPost);
        setSalePost(() => _salePost);
        setPost(() => content);

        setMyHome(() => _indvPost);
        setLoading(() => false);
      } catch (error) {
        console.log(error);
        setLoading(() => false);
      }
    };
    fetchData();
  }, [data]);

  const value = {
    salePost,
    rentPost,
    posts,
    loading,
    government,
    myHome,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyHandler;
