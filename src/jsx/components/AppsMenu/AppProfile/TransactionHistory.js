import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { baseURL } from "../../../../Strings/Strings";
import sortArray from "../../../../utils/sort";

function TransactionHistory() {
  const [data, setData] = useState([]);
  const [deposit, setdeposit] = useState([])
  const [fullData, setfullData] = useState([])
  const [order, setorder] = useState("ASC")

  useEffect(() => {

    let usr = localStorage.getItem("user");
    let token = JSON.parse(localStorage.getItem("token"))
    usr = JSON.parse(usr);
    axios
      .get(`${baseURL}/api/withdraw/${usr?.id}`,{headers: { "x-auth-token": token }})
      .then((res) => {
        console.log(res?.data, "res");
        const nn = res?.data?.map(i => {
          return {...i, type:"Withdraw"}
        })
        setData(nn.reverse());
      }).catch(err=>{console.log(err?.response?.data)});



      axios
      .get(`${baseURL}/api/deposit/${usr?.id}`,{headers: { "x-auth-token": token }})
      .then((res) => {
        console.log(res?.data, "res");
        const nn = res?.data?.map(i => {
          return {...i, type:"Deposit"}
        })
        setdeposit(nn.reverse());
      }).catch(err=>{console.log(err?.response?.data)});
  }, []);
  useEffect(()=>{
    setfullData([...data,...deposit])
  },[data,deposit])

  const sortDATA = (arr,elem,type,order) => {
    setfullData(sortArray(arr,elem,type,order))
    order == "ASC" ? setorder("DESC") : setorder("ASC")
  }

  return (
    <div>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>Transaction History</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th onClick={()=>{sortDATA(fullData,"requested_at","date",order)}} >Date Time</th>
                  <th onClick={()=>{sortDATA(fullData,"status","string",order)}} >Status</th>
                  <th onClick={()=>{sortDATA(fullData,"type","string",order)}} >Type</th>
                  <th onClick={()=>{sortDATA(fullData,"amount","num",order)}} >Amount</th>
                </tr>
              </thead>
              <tbody>
                {fullData?.map((req, ind) => {
                  return (
                    <tr key={ind}>
                      <td>
                        <Link to="/table-bootstrap-basic">{ind + 1}</Link>
                      </td>

                      <td>
                        <span className="text-muted">
                          {req?.status == "Pending"
                            ? moment(req?.requested_at).format(
                                "YYYY-MM-DD hh:mm a"
                              )
                            : moment(req?.requested_at).format(
                                "YYYY-MM-DD hh:mm a"
                              )}
                        </span>
                      </td>
                      <td>
                        <Badge
                          variant={`${
                            req?.status === "Rejected"
                              ? "danger light"
                              : req?.status === "Approved"
                              ? "primary light"
                              : "warning light"
                          }`}
                          style={{ width: 80 }}
                        >
                          {req?.status}
                        </Badge>
                      </td>
                      <td>{req?.type}</td>
                      <td>$ {req?.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default TransactionHistory;
