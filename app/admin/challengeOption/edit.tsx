import { SimpleForm, Edit, TextInput, required, ReferenceInput, BooleanInput } from "react-admin";

export const ChallengeOptionEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <BooleanInput 
                    source="correct"
                    validate={[required()]}
                    label="Correct Option"
                />
                <ReferenceInput 
                    source="challengeId"
                    reference="challenges"
                />
                <TextInput 
                    source="imageSrc"
                    label="Image URL"
                />
                <TextInput 
                    source="audioSrc"
                    label="Audio URL"
                />
            </SimpleForm>
        </Edit>
    );
};

// TextField is ONLY for REPRESENTATION. Use TextInput for inputting text