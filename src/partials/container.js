import axios from 'axios';
import Swal from 'sweetalert2';
import SendXrpModal from '../modal/sendXrpModal';
import { useState } from 'react';
import DetailsModal from '../modal/detailsModal';
import HistoryModal from '../modal/historyModal';

export default function Container({data}){
    const [initial, setInitial] = useState('');
    const [title, setTitle] = useState('');
    const [credTitle, setCredTitle] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [address, setAddress] = useState('');
    const [credSeed, setCredSeed] = useState('');
    const [balance, setBalance] = useState('');
    const [ledgerHash, setLedgerHash] = useState('');
    const [ledgerIndex, setLedgerIndex] = useState('');
    const [historyModalData, setHistoryModalData] = useState([]);

    const changeValue = async (d) => {
        setCredTitle(d.title);
        setPublicKey(d.public_key);
        setPrivateKey(d.private_key);
        setAddress(d.address);
        setCredSeed(d.seed);
        setLedgerHash(d.ledger_hash);
        setLedgerIndex(d.ledger_index);
        setBalance('Loading...');
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/get-balance/${d.id}`);
            const balance = res.data.balance;
            setBalance(`${balance} XRP`);
        } catch (e) {
            setBalance("Cannot get balance!");
        }
    }

    const setSendXrpModal = (d) => {
        setInitial(d.address);
        setTitle(d.title);
    }

    const getHistory = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/get-logs/${id}`);
            setHistoryModalData(res.data.data);
        } catch (e){
            let message
            switch(e.status){
                case 500:
                    message = "Server error!";
                    break;
                case 404:
                    message = "Not found!";
                    break;
                default: 
                    message = "";
            }
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: message,
            });
        }
    }

    return (
        <div className="container mt-3">
            <div className="row">
                {
                    data.map((d) => {
                        return (
                            <div className="col-md-3 col-sm-6" key={d.id}>
                                <div className="card mb-2 me-2"  style={{ width: '17rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{d.title}</h5>
                                        <h6 className="card-subtitle mb-3 text-body-secondary"><small style={{ fontSize: '10px' }}>{d.address}</small></h6>
                                        <button className="btn btn-primary btn-sm me-2" onClick={() => getHistory(d.id)} data-bs-toggle="modal" data-bs-target="#historyModal">History</button>
                                        <button className="btn btn-success btn-sm me-2" onClick={() => setSendXrpModal(d)}  data-bs-toggle="modal" data-bs-target="#sendXrpModal">Send XRP</button>
                                        <button className="btn btn-info btn-sm" onClick={() => changeValue(d)} data-bs-toggle="modal" data-bs-target="#detailsModal">Details</button>
                                    </div>
                                </div>
                            </div>
                            
                        )
                    })
                }
            </div>
            <HistoryModal data={historyModalData}/>
            <DetailsModal credTitle={credTitle} publicKey={publicKey} privateKey={privateKey} address={address} credSeed={credSeed} balance={balance} ledgerIndex={ledgerIndex} ledgerHash={ledgerHash}/>
            <SendXrpModal initial={initial} title={title}/>
        </div>
    )
}