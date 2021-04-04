import React, { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { Spinner } from './Spinner';

import './FetchButton.scss'; 

interface Props {
    url: string; //url to ping
    config?: {}; //headers if making a get request
    setter: Dispatch<SetStateAction<any>>; //change the state of the parent component
    label: string;
    payload?: {}; //if making a post request
    disabled: boolean;
};

export const FetchButton: React.FC<Props> = ({ url, config, setter, label, disabled, payload }) => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [err, setErr] = useState<any>(false);

    const buttonHandler = () => {
        if (!loadingData) { //if there is nothing being processed
            setLoadingData(true);
            setErr(false);
            if (!config) { //if no token is passed (getting a token)
                setLoadingData(true);
                axios.post(url, payload)
                    .then(res => {
                        setter(res.data.token);
                        setLoadingData(false);
                    })
                    .catch(err => {
                        setErr(err);
                        setLoadingData(false);
                    });
            } else { //if a token is passed (getting data)
                axios.get(url, config)
                    .then(res => {
                        console.log(res.data);
                        setter(res.data);
                        setLoadingData(false);
                    })
                    .catch(err => {
                        setErr(err);
                        setLoadingData(false);
                    });
            }
        };
    }

    return (
        <div className='FetchButton'>
            {
                err ?
                    <p>ERROR: {err.response.data}</p> : null
            }
            {
                loadingData ?
                    <Spinner /> :
                    <button disabled={disabled} onClick={buttonHandler}>{label}</button>
            }
        </div>
    )
}
