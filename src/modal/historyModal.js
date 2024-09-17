import { format, parseISO } from "date-fns";

export default function HistoryModal({data}){
    let element;
    if(data.length > 0){
        element = (
            data.map((d) => {
                return (
                    <tr key={d.id}>
                        <td>{d.destination}</td>
                        <td>{d.amount} XRP</td>
                        <td>{d.fee} XRP</td>
                        <td>{d.total_amount} XRP</td>
                        <td>{d.transaction_type}</td>
                        <td>{d.result}</td>
                        <td>{format(parseISO(d.created_at), 'yyyy-MM-dd HH:mm:ss')}</td>
                    </tr>
                )
            })
        )
    } else {
        element = (
            <tr>
                <td colSpan={7}>No Data!</td>
            </tr>
        );
    }
    return (
        <div className="modal fade" id="historyModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="historyModalLabel">Transaction History</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <table className="table table-striped text-center">
                        <thead>
                            <tr>
                                <th>Destination</th>
                                <th>Amount</th>
                                <th>Fee</th>
                                <th>Total Amount</th>
                                <th>Type</th>
                                <th>Result</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                element
                            }
                        </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}