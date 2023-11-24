import React from 'react';
import Loader from "react-loader-spinner";

const Loaders = () => {
    return (
        <Loader
            type="Rings"
            color="black"
            height={150}
            width={150}
            timeout={2000} //3 secs
            style={{
                marginTop: '90px',
                textAlign: 'center',
            }}
        />
    );
}

export default Loaders;