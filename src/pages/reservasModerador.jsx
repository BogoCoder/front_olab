import React from 'react';
import ReservasModerador from '../components/ReservasModerador';

const ReservasModeradorPage =  () => {
    return (
        <React.Fragment>
            <div style={{backgroundColor: '#F7F7F7',  width: '100%', height : '100vh'}}>
              <br/>
              <ReservasModerador />                
            </div>
        </React.Fragment>
    );
};

export default ReservasModeradorPage;