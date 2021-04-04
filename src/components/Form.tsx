import moment from 'moment';
import React, { useState, useContext } from 'react';
import { DataContext } from '../store/DataContext';
import { FetchButton } from './FetchButton';
import './Form.scss';

const symbols = ['USD', 'JPY', 'EUR', 'AUD'];
const now = new Date();

interface Props {
    token: string;
}

export const Form: React.FC<Props> = ({ token }) => {

    const dataContext = useContext(DataContext);

    const [mode, setMode] = useState<string>('');
    const [quote, setQuote] = useState<string>('');
    const [value, setValue] = useState<number>(0);
    const [startDate, setStartDate] = useState<Date>(now);
    const [endDate, setEndDate] = useState<Date>(now);
    const [historicalDate, setHistoricalDate] = useState<Date>(now);

    const dropDownHandler = (e: React.ChangeEvent<HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter(e.target.value);
    };

    const dateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<Date>>) => {
        setter(moment(e.target.value, 'YYYY-MM-DD').toDate());
    }

    const generateQuery = () => {
        let string = `?quote=${quote}`;

        switch (mode) {
            case 'convert':
                return `http://localhost:3050/convert${string}&amount=${value}`;
            case 'historical':
                return `http://localhost:3050/historical${string}&date=${moment(historicalDate).format('YYYY-MM-DD')}`;
            case 'range':
                return `http://localhost:3050/range${string}&start=${moment(startDate).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}`
            default:
                return ``;
        }
        
    }

    //returning a config object for the tokenized request
    const getconfig = () => {
        return {
            headers: {
                'TOKEN': token
            }
        }
    }

    return (
        <div className='Form'>
            <section>
                <h3>What would you like to do?</h3>
                <select onChange={e => dropDownHandler(e, setMode)}>
                    <option disabled={true} selected={true}>please select</option>
                    <option value='convert'>Convert Currency</option>
                    <option value='historical'>Get the rate from a specific date</option>
                    <option value='range'>Get the rates across a range of dates</option>
                </select>
            </section>
            <section>
                <h3>Pick a rate</h3>
                <div className='flex'>
                    <div>
                        <h4>Quote</h4>
                        <select onChange={e => dropDownHandler(e, setQuote)}>
                            <option disabled={true} selected={true} >please select</option>
                            {
                                symbols.map(symb => {
                                    return (
                                        <option value={symb} key={symb}>
                                            {symb}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </section>
            {
                //conversion mode 
                mode == 'convert' ?
                    <section>
                        <h3>Enter a value</h3>
                        <input
                            placeholder={`99.00`}
                            onChange={e => setValue(+e.target.value)} />
                    </section> :
                    null
            }
            {
                //historical mode 
                mode == 'historical' ?
                    <section>
                        <h3>Rate from a specific date</h3>
                        <div>
                            <h4>Date</h4>
                            <input type='date' onChange={e => dateChangeHandler(e, setHistoricalDate)} />
                        </div>
                    </section> :
                    null
            }
            {
                //range mode
                mode == 'range' ?
                    <section>
                        <h3>Rates between a range of dates</h3>
                        <div>
                            <div>
                                <h4>Start Date</h4>
                                <input type='date' onChange={e => dateChangeHandler(e, setStartDate)} />
                            </div>
                            <div>
                                <h4>End Date</h4>
                                <input type='date' onChange={e => dateChangeHandler(e, setEndDate)} />
                            </div>
                        </div>
                    </section> :
                    null
            }
            {
                mode &&
                <FetchButton
                    config={getconfig()}
                    url={generateQuery()}
                    setter={dataContext.setData}
                    label='grab data'
                    disabled={false} />
            }
        </div>
    )
}
