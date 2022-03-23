import React, { useEffect, useState } from 'react'
import { cryptoList } from '../../utils/api';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

const List = () => {

    const [cryptoCoinList, setCryptoCoinList] = useState([]);
    const [loading, setLoading] = useState(false);

    const callCryptoListApi = () => {
        setLoading(true);
        cryptoList((res) => {
            setLoading(false);
            setCryptoCoinList(res);
            let tableDatas = [];
            res.map((item, index) => {
                tableDatas = [
                    {
                        srNo: index + 1,
                        currencyName: item.name,
                        currencyRank: item.id + 1,
                        cuurencySymbol: item.symbol,
                    }
                ]
                console.log(tableDatas);
            })
        })
    }

    useEffect(() => {
        callCryptoListApi();
        const timer = setInterval(callCryptoListApi(), 5000);
        return () => clearInterval(timer);
        // setInterval(() => {  // for updating the data for every 15 sec
        // callCryptoListApi();
        // }, 150000);
    }, [])

    const checkSign = (value) => {
        if (value > 0) {
            return <span className="text-success">{value} %</span>
        } else if (value < 0) {
            return <span className="text-danger">{value} %</span>
        } else {
            return <span className="text-warning">{value} %</span>
        }
    }


    return (
        loading ? <div> Loading...</div > : (
            <>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Top CryptoCurrency List</h4>
                                    <button className="btn btn-primary float-right" onClick={callCryptoListApi}>Refresh</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{ marginTop: 50 }}>
                    <BootstrapTable
                        striped
                        bootstrap4={true}
                        hover
                        keyField="id"
                        data={cryptoCoinList && cryptoCoinList.map((item, index) => {
                            return (
                                {
                                    currencyIcon: <img src={item.image} width='50px' />,
                                    currencyName: item.name,
                                    currencyRank: index + 1,
                                    cuurencySymbol: (item.symbol).toUpperCase(),
                                    currencyPrice: `₹ ${item.current_price}`,
                                    currencyMarketCap: item.market_cap,
                                    currenctPriceChange: checkSign(item.price_change_percentage_24h),
                                }
                            )
                        })}
                        columns={[
                            {
                                dataField: "currencyRank",
                                text: "Currency Rank",
                                filter: textFilter(),
                                sort: true
                            },
                            {
                                dataField: "currencyIcon",
                                text: "Currency Icon",
                            },
                            {
                                dataField: "currencyName",
                                text: "Currency Name",
                                filter: textFilter()
                            },
                            {
                                dataField: "cuurencySymbol",
                                text: "Currency Symbol"
                            },
                            {
                                dataField: "currencyPrice",
                                text: "Currency Price(INR)",
                                filter: textFilter(),
                            },
                            {
                                dataField: "currencyMarketCap",
                                text: "Currency Market Cap"
                            },
                            {
                                dataField: "currenctPriceChange",
                                text: "Currency Price Change"
                            }
                        ]}
                        filter={filterFactory()}
                        pagination={paginationFactory()}
                    />
                </div>
            </>)
    )
}

export default List