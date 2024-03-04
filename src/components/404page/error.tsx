import React, { memo } from 'react';

const Error = memo(() => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{height:'200px'}}>
            <div className='d-flex flex-column align-items-center my-5'>
                 <code className='fs-1'>Error 404 <span className='bi bi-bug-fill'></span></code>
                 <br/>
                 <code className='fs-1'>Page Not Found</code>
            </div>
            
        </div>
    );
});

export default Error;