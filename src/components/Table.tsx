import React from 'react'; 
import './Table.scss';

interface Props {
    data: Data[];
}

export const Table: React.FC<Props> = ({data}) => {

    return (
        <div className='Table'>
            <div className='header'><h4>TIMESTAMP</h4><h4>DATE</h4><h4>PRICE</h4></div>
            <div className='container'>
            {
                data.map(({symbol, date, rate })=>{
                    return(
                        <div key={date+rate}>
                            <p>{symbol}</p>
                            <p>{date}</p>
                            <p>{rate}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
