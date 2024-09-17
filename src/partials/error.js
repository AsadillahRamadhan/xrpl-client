export default function Error(){
    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
            backgroundColor: '#3b3a3a'
         }}>
            <div style={{ 
                color: '#a1a1a1',
                fontSize: '50px',
                fontFamily: 'sans-serif'
             }}>Error Network!</div>
        </div>
    );
}