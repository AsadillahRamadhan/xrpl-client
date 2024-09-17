import axios from "axios";
import { useState } from "react"
import Loading from "../partials/loading";
import Swal from "sweetalert2";

export default function SendXrpModal({ initial, title }){
    const [destination, setDestination] = useState("");
    const [amount, setAmount] = useState("");
    const [seed, setSeed] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const sendXrp = async (e) => {
        e.preventDefault();
        const confirm = await Swal.fire({
            title: "Do you really want to send the XRP?",
            showCancelButton: true,
            confirmButtonText: "Save",
        });

        if(confirm.isConfirmed){
            setIsLoading(true);
            try {
                const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/send-xrp`, {
                    amount,
                    destination_address: destination,
                    account_seed: seed,
                    account_address: initial
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
    
                if(res.status === 201){
                    document.querySelector('#sendXrpModalButton').click();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Send XRP success!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                
    
            } catch (e){
                let message;
                switch(e.status){
                    case 422: 
                        message = "The wallet seed doesn't match with the wallet address!";
                        break;
                    case 400: 
                        message = "Invalid input!";
                        break;
                    default:
                        message = "Unknown error!";
                }
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: message,
                });
            }
            setIsLoading(false);
        }
    }

    const clearInput = () => {
        setDestination("");
        setAmount("");
        setSeed("");
    }

    return (
        <form onSubmit={sendXrp}>
            <div className="modal fade" id="sendXrpModal" tabIndex="-1" data-bs-backdrop="static" aria-labelledby="sendXrpModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="sendXrpModalLabel">Send XRP</h1>
                        <button type="button" id="sendXrpModalButton" className="btn-close" onClick={clearInput} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        { isLoading && <Loading/> }
                        <div className="form-group">
                            <label htmlFor="initial" className="form-label">Initial Title</label>
                            <input type="text" value={title} className="form-control" disabled/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="initial" className="form-label">Initial Address</label>
                            <input type="text" value={initial} className="form-control" disabled/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="initial" className="form-label">Destination Address</label>
                            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="form-control"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="initial" className="form-label">Amount</label>
                            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="form-control"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="initial" className="form-label">Initial Seed</label>
                            <input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={clearInput} data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                    </div>
                </div>
            </div>
        </form>
    )
}