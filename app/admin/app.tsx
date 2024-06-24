"use client";

import { Admin, DataProvider, Resource, } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";

const dataProvider = simpleRestProvider("/api") as DataProvider; // Will break unless you put "as DataProvider" https://github.com/marmelab/react-admin/issues/5476

export const App = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="courses"
                list={CourseList}
                create={CourseCreate}
                recordRepresentation="title"
            />
        </Admin>
    )
};

export default App;