export default function DetailsModal({credTitle, publicKey, privateKey, address, credSeed, balance, ledgerIndex, ledgerHash}) {
    return (
        <div className="modal fade" id="detailsModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="detailsModalLabel">Account Details</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <h6>Title: {credTitle}</h6><br/>
                    <h6>Public Key: {publicKey}</h6><br/>
                    <h6>Private Key: {privateKey}</h6><br/>
                    <h6>Address: {address}</h6><br/>
                    <h6>Seed: {credSeed}</h6><br/>
                    <h6>Balance: {balance}</h6><br/>
                    <h6>Ledger Index: {ledgerIndex}</h6><br/>
                    <h6>Ledger Hash: {ledgerHash}</h6>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}