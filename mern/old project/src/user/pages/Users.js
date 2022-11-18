import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [{
        id: 'u1',
        name: 'Max Schwarz',
        image: 'https://directionallychallengedtraveler.com/wp-content/uploads/2021/02/Assisi-Copyright-Veggiewayfarer-Resized-1024x684.jpg',
        places: 3
    }];



    return <UsersList items={USERS} />;
}

export default Users;