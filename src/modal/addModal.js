import axios from "axios";
import { useState } from "react"
import Swal from "sweetalert2";

export default function AddModal({isLoading, refetch}){
    const [title, setTitle] = useState("");
    const [seed, setSeed] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();
        document.querySelector('#addWalletButton').click();
        setTitle("");
        setSeed("");
        isLoading(true);
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/get-account`, {
                title,
                account_seed: seed
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if(res){
                refetch();
                isLoading(false);
            }
        } catch (e){
            isLoading(false);
            let message;
            switch(e.status){
                case 422:
                    message = 'Wallet already exists!';
                    break;
                case 400:
                    message = 'Invalid Seed!';
                    break;
                default:
                    message = '';
            };

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: message,
            });
        }
    };

    return (
        <form onSubmit={submitForm}>
            <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Wallet</h1>
                        <button type="button" id="addWalletButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control"/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="seed" className="form-label">Wallet Seed</label>
                            <input id="seed" type="password" value={seed} onChange={(e) => setSeed(e.target.value)} className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                    </div>
                </div>
            </div>
        </form>
    )
}