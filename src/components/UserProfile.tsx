import React from "react";
import '../css/UserProfile.css';

const UserProfile = () => {

  return (
    <section className='user-profile'>
      <h2>Hi, _______!</h2>
      <div className='profile-column-container'>
        <section className='profile-column'>
          <p>Your Puzzles</p>
        </section>
        <section className='profile-column'>
          <p>Sent Requests</p>
        </section>
        <section className='profile-column'>
          <p>Received Requests</p>
        </section>
      </div>
    </section>
  )
}

export default UserProfile;