export default function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg bg-secondary">
            <div className="container">
                <a className="navbar-brand text-light" href="/">TEKAD Wallets</a>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                   + Add Wallet
                </button>
            </div>
        </nav>
    );
}