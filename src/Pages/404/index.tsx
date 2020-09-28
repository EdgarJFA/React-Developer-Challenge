import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageHeader from '../../Components/PageHeader';

import './styles.css';

function NotFound() {
    const [time, setTime] = useState(30);
    const History = useHistory();

    function handleReloadTime(time: number) { 
        if(time > 1) {             
            setTime(time-1);
        } else {
            // Reload da pagina getCoutries
            History.push('/listofcountries');
        }
    }

    // function HandleReload() {
    //     setTime(0);
    //     History.push('/listofcountries');
    // }

    useEffect(() => {
        setTimeout(                
            () => {handleReloadTime(time)}
        , 1000);        
    }, [time]);

    return (
        <div id="PageNotFound">
            <div className="content">
                <PageHeader home="/" countrieList="/listofcountries" />
                <main>
                    <div className="TextContent">
                        <h2>We have a problem</h2>
                        <p>Page not found</p>
                        <Link to="/listofcountries" className="normal">Reload {(time<=0)? '': time}</Link>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default NotFound;