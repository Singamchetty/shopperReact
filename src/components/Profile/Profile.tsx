import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reduxstore/store';

const Profile = memo(() => {
    const userData = useSelector((state: RootState) => state.userDetails.userDetails);

    useEffect(()=>{console.log(userData)},[userData])

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal">
                <span className='bi bi-person'></span>
            </button>

            <div className="modal fade" id="profileModal" tabIndex={-1} aria-labelledby="profileModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="profileModalLabel">My Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center align-items-center">
                           {
                            userData &&  <div>
                                <p className='text-center'><span className='bi bi-person fs-1'></span></p>
                            <p>User : {userData.userId}</p>
                            <p>Email: {userData.email}</p>
                            <p>Mobile: {userData.mobile}</p>
                        </div>
                           }
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Profile;