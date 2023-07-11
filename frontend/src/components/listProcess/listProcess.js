import React, { useEffect, useState } from "react";
import "./listProcess.css";
import { VscInfo,VscPass } from "react-icons/vsc";
import { Link } from "react-router-dom";

const ListProcess =() => {
    return(
        <div className="list-process-body">
            <div className="list-process-header">
                <h2>Danh sách Bất Động Sản đang chờ xác nhận</h2>
            </div>
            <Link to={"../goverment"}>
            <div className="list-process-details">
                <div className="list-process-content">
                    <div className="list-process-title">
                        <div className="list-process-title-span">
                        <span>
                        Chính chủ, bán nhà TTTP Đà Nẵng, full nội thất, an ninh cao vdsvd dfgd dfgdf dfgdgd dfgfdhdh
                        </span>
                        </div>

                    </div>

                    <div className="list-process-partner">
                        <div className="list-process-buyer">
                            <span className="list-process-buyer-span">
                                Bên mua: 
                                <span className="ml-8">
                                hiếu
                                </span>
                                
                            </span>
                        </div>

                        <div className="list-process-seller">
                            <span>
                                Bên bán: 
                                <span className="ml-8">
                                    xuantoan
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="list-process-wait-day">
                        <span>
                            Ngày giao dịch: 
                            <span className="ml-8">
                            28/03/2023
                            </span>
                        </span>
                        
                    </div>
                </div>

                <div className="list-process-status">
                    <span className="status-process">
                        Đang xử lí
                    </span>
                    <VscInfo className="icon-status-info"></VscInfo>
                </div>
 
            </div>
            </Link>

            <Link to={"../goverment"}>
            <div className="list-process-details">
                <div className="list-process-content">
                    <div className="list-process-title">
                        <div className="list-process-title-span">
                        <span>
                        Chính chủ, bán nhà TTTP Đà Nẵng, full nội thất, an ninh cao vdsvd dfgd dfgdf dfgdgd dfgfdhdh
                        </span>
                        </div>

                    </div>

                    <div className="list-process-partner">
                        <div className="list-process-buyer">
                            <span className="list-process-buyer-span">
                                Bên mua: 
                                <span className="ml-8">
                                hiếu
                                </span>
                                
                            </span>
                        </div>

                        <div className="list-process-seller">
                            <span>
                                Bên bán: 
                                <span className="ml-8">
                                    xuantoan
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="list-process-wait-day">
                        <span>
                            Ngày giao dịch: 
                            <span className="ml-8">
                            28/03/2023
                            </span>
                        </span>
                        
                    </div>
                </div>

                <div className="list-process-status">
                    
                    <span className="status-process">
                        Đã xử lí
                    </span>
                    <VscPass className="icon-status-pass"></VscPass>
                </div>

            </div>
            </Link>


        </div>
    )
}
export default ListProcess