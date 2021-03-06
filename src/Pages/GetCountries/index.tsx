import React, { useState, useEffect } from 'react';
import { WaveLoading  } from 'react-loadingg';
import ReactToExcel from 'react-html-table-to-excel';
import { CSVLink } from "react-csv";

import PageHeader from '../../Components/PageHeader';
import api from '../../services/api';
import './styles.css';

interface InfoCountiresProps {
    name: string;
    capital: string;
    nativeName: string;
    callingCodes: Array<string>;
    region: string;
    subregion: string;
    population: number;
    area: number;
    timezones: Array<number>;
    flag: string;
}

function GetCountries() {
    const [infoCountries, setInfoCountries] = useState<InfoCountiresProps[]>([]);
    const [apiLoaded, setApiLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [nameFile, setNameFile] = useState('');

    const headers = [
        { label: 'Country', key: 'name' },
        { label: 'Capital', key: 'capital' },
        { label: 'Native Name', key: 'nativeName' },
        { label: 'Calling Codes', key: 'callingCodes' },
        { label: 'Region', key: 'region' },
        { label: 'Subregion', key: 'subregion' },
        { label: 'Population', key: 'population' },
        { label: 'Area', key: 'area' },
        { label: 'Time zones', key: 'timezones' },
        { label: 'Flag Link', key: 'flag' },
      ];

    useEffect(() => {
        handleSetPath();
    }, []);

    function handleSetPath(path = 'all', fileName = 'All Countries') {
        setLoading(true);
        setApiLoaded(false);
        api.get(path).then(response => {             
            setInfoCountries(response.data);            
            setNameFile(fileName);
            setLoading(false);
            setApiLoaded(true);
        })
        setTimeout(() => {
            setLoading(false);
        },30000);  
    }

    return (
        <div id="GetCountries">
            <div className="content" >
                <PageHeader home="/" countrieList="/listofcountries" />
                <main>
                    <div className="sub-content">
                        <h2>Discovery the world</h2>
                        <p>Find information about any country</p>                    
                    </div>
                    <div id="#app" className="main-content">
                        <div className="button">
                            <button onClick={ () => handleSetPath()} >All Countries</button>
                            <button onClick={ () => handleSetPath('region/africa','africa')} >Africa</button>
                            <button onClick={ () => handleSetPath('region/americas','americas')} >Americas</button>
                            <button onClick={ () => handleSetPath('region/asia','asia')} >Asia</button>
                            <button onClick={ () => handleSetPath('region/europe','europe')} >Europe</button>
                            <button onClick={ () => handleSetPath('region/oceania','oceania')} >Oceania</button>                        
                        </div>
                        <div className="content-API">
                            { loading ? <span className="loading">wait for data to load<WaveLoading  size="large" color="#63D4CC" /></span> :
                                ( apiLoaded ? 
                                    <table id="table-to-xls" >
                                        <tbody>
                                            <tr >
                                                <th>Country</th>
                                                <th>Capital</th>
                                                <th>Native Name</th>
                                                <th>Calling Codes</th>
                                                <th>Region</th>
                                                <th>Subregion</th>
                                                <th>Population</th>
                                                <th>Area</th> 
                                                <th>Time zones</th>
                                                <th>Flag Link</th>
                                            </tr>
                                            {infoCountries.map((infoCountrie: InfoCountiresProps) => {
                                                return (
                                                    <tr key={infoCountrie.name} >
                                                        <td>{infoCountrie.name}</td>
                                                        <td>{infoCountrie.capital}</td>
                                                        <td>{infoCountrie.nativeName}</td>
                                                        <td>{infoCountrie.callingCodes.join(', ')}</td>
                                                        <td>{infoCountrie.region}</td>
                                                        <td>{infoCountrie.subregion}</td>
                                                        <td>{infoCountrie.population}</td>
                                                        <td>{infoCountrie.area}</td>                                                        
                                                        <td>
                                                            { 
                                                            (!infoCountrie.timezones[1]) ? infoCountrie.timezones[0] : `${infoCountrie.timezones[0]}, +`
                                                            }
                                                        </td>
                                                        <td><a href={infoCountrie.flag} target="_blank" rel="noopener noreferrer">{infoCountrie.flag}</a></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table> : <div className="loaded-container"><span className="loading-failed">failed to load data. check your internet connection and try again</span></div>
                                )
                            }
                        </div>
                        { apiLoaded ? 
                            <div className="exportButton">
                                <ReactToExcel
                                    className="export-excel"
                                    table="table-to-xls"
                                    filename= {nameFile}
                                    sheet="sheet 1"
                                    buttonText="EXPORT TO EXCEL"
                                />
                            </div>
                             : <></>    
                        }           
                    </div>
                </main>
            </div>
            { apiLoaded ? 
                <div className="exportButton">
                    <ReactToExcel
                        className="export-excel"
                        table="table-to-xls"
                        filename= {nameFile}
                        sheet="sheet 1"
                        buttonText="Export to XLS"
                    />

                    <CSVLink
                        headers={headers}
                        data={infoCountries.map((infoCountrie: InfoCountiresProps) => ({
                            name: infoCountrie.name,
                            capital: infoCountrie.capital,
                            nativeName: infoCountrie.nativeName,
                            callingCodes: infoCountrie.callingCodes,
                            region: infoCountrie.region,
                            subregion: infoCountrie.subregion,
                            population: infoCountrie.population,
                            area: infoCountrie.area,
                            timezones: infoCountrie.timezones,
                            flag: infoCountrie.flag
                        }))}                        
                        filename={`${nameFile}.csv`}
                        className="export-excel-csv"
                        // target="_blank"
                    >
                        Export to CSV
                    </CSVLink>
                </div> : <></>    
            } 
        </div>
    );
}

export default GetCountries;