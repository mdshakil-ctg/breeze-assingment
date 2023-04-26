import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
   return (
      <div>
         <Link to='/'><button className='bg-gray-200 p-5 rounded-lg mt-4 font-semibold mr-5 hover:bg-gray-400'>Goto Register Page</button></Link>
         <Link to='/login'><button className='bg-gray-200 p-5 rounded-lg mt-4 font-semibold mr-5 hover:bg-gray-400'>Goto Login Page</button></Link>
         <h2 className='text-5xl font-bold mt-7'>Hello world!</h2>

      </div>
   );
};

export default Dashboard;