import React, { useState, useContext } from 'react';
import {DataContext} from '../store/DataContext';
import {FetchButton} from '../components/FetchButton';
import { Form } from '../components/Form';
import './Home.scss';
import { LongDataDisplay } from '../components/LongDataDisplay';

const tokenURL: string = 'http://localhost:3050/token';

export const Home: React.FC = () => {
    //storing tha username
    const [userName, setUsername] = useState<string>('');
    //storing the token 
    const [token, setToken] = useState<string>('');

    const {data} = useContext(DataContext);

    //username input change handler
    const handleUsername = (e: React.FormEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value);
    }

    return (
        <div className='Home'>
            <h1>EUR Exchange Rates</h1>
            {
                //when there is a single piece of data, display that data to the user
                data && data.length == 1 && 
                <div className='bubble'>
                    <h6>{data[0].symbol}</h6>
                    <h6>{data[0].rate}</h6>
                    <h6>{data[0].date}</h6>
                    {data[0].equals && <h6>{data[0].equals + data[0].symbol.split('/')[1]}</h6>}
                </div>
            }
            {
                data && data.length > 1 && <LongDataDisplay data={data}/>
            }
            {
                !token && //when there is no token, prompt the user to generate a token 
                <>
                    <input onChange={handleUsername} type='text' placeholder='enter a username' />
                    <h4>Click here to get your token</h4>
                    <FetchButton
                        disabled={!userName} //button disabled without username 
                        label='GET TOKEN'
                        url={tokenURL}
                        setter={setToken}
                        payload={{ username: userName }} />
                </>
            }
            {
                token &&  <Form token={token}/>//when the user has received a token, allow them to pull data
            }
        </div>
    )
}
