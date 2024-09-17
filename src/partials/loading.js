import { RotatingLines } from "react-loader-spinner"
export default function Loading(){
    return (
        <div style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
    );
}