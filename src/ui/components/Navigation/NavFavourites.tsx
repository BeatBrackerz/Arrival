import React from 'react';
import {FlatList, View} from "react-native";
import NavListItem from "./NavListItem";


const data = [
    {
        id: 123,
        icon: 'home',
        location: 'Home',
        destination: 'Code Street, London, UK'
    },
    {
        id: 456,
        icon: 'briefcase',
        location: 'Work',
        destination: 'London Eye, London, UK'
    },
];


const NavFavourites = () => {
    return(
        <FlatList
            data={data}
            // @ts-ignore
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
                <View
                 className="bg-gray-200 dark:bg-slate-700"
                 style={{height: 0.5}}
                />
            )}
            renderItem={({item,index}) => <NavListItem key={`NavListFavourites_${index}`} index={index} location={item.location} destination={item.destination} icon={item.icon}/>}
        />
    )
};

export default NavFavourites;