import { Datagrid, List, NumberField, ReferenceField, TextField, SelectField } from "react-admin";

export const ChallengeList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <NumberField source="id" />
                <TextField source="question" />
                <SelectField 
                    source="type"
                    choices={[
                        {
                            id: "SELECT",
                            name: "SELECT",
                        },
                        {
                            id: "ASSIST",
                            name: "ASSIST",
                        },
                        {
                            id: "LISTEN_SELECT",
                            name: "LISTEN_SELECT",
                        },
                    ]}
                /> {/*You can add more options in the array*/}
                <ReferenceField source="lessonId" reference="lessons" />
                <NumberField source="order" />
                <TextField source="audioSrc" />
            </Datagrid>
        </List>
    );
};