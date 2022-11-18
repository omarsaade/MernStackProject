import React from 'react'

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card'
import './UsersList.css'


function UsersList(props) {

    if (props.items.length === 0) {
        return (
            <div className='center'>
                <Card>
                    <h2>No Users Found.</h2>
                </Card>
            </div>
        );
    }



    return (
        <ul className='users-list'>
            {props.items.map(user => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.places}

                />
            ))}
            {/* {props.items.map((user) => {
            return <UserItem />;
        })} */}
        </ul>
    );
};

export default UsersList
