"use client";

import { Admin, DataProvider, ListGuesser, Resource, memoryStore } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("/api") as DataProvider; // Will break unless you put "as DataProvider" https://github.com/marmelab/react-admin/issues/5476

export const App = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="courses"
                list={ListGuesser}
                recordRepresentation="title"
            />
        </Admin>
    )
};

export default App;