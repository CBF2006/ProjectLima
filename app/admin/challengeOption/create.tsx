import { SimpleForm, Create, TextInput, required, ReferenceInput, BooleanInput } from "react-admin";

export const ChallengeOptionCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput 
                    source="question" // Why is the source question?
                    label="Text" 
                />
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
        </Create>
    );
};

// TextField is ONLY for REPRESENTATION. Use TextInput for inputting text