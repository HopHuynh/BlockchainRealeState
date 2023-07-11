import axios from "axios";

export const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZjk0ZjEzOC01OGQ5LTQ2MWEtYjFlNi0yZjkyZTY5MTNhYmEiLCJlbWFpbCI6ImFjaHl1dDMxM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzdlZTEyM2ZhZWNjOTdhNjQ3YzciLCJzY29wZWRLZXlTZWNyZXQiOiJmOTM0MjFiYjVjYmE4Y2EzMmI1ZTUxOGVkZTM3MWFhNzJkNzZhZmJjYzY0MjU0ODVmNGEyMzg4MWQ3NzM1MTNkIiwiaWF0IjoxNjczMDE2NjgyfQ.UYgGDcvG-3YDt3aobMtbdE7Ctw5pU3DtnzZxpslFQGE";
const fileToIpfs = async (File) => {
  let data = [];
  for (let i = 0; i < File.length; i++) {
    try {
      const fd = new FormData();
      fd.append("file", File[i]);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fd,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      data.push(res.data.IpfsHash);
    } catch (error) {
      console.log(error);
    }
  }
  return data;
};

export default fileToIpfs;

export const JsonToPinata = async (JsonData) => {
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      JsonData,
      {
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return res.data.IpfsHash;

    //QmSiowt1Xs3M9BtTYoZr3vrsFRzgzuJ3p27CrPoaMAiRz9
  } catch (error) {
    console.log(error);
    return;
  }
};
