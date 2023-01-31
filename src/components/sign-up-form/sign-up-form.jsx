import { useState} from "react";

import FormInput from "../form-input/form-input.component";
import "../sign-up-form/sign-up-from.styles.scss"
import Button from "../button/button.component";


import { createAuthUserWithEmailAndPassword,
     createUserDoumentFromAuth 
} from "../../utils/firebase/firebase.utlis";


const defaultformFields = {
    displayName : "",
    email : "",
    password: "",
    confirmPassword : ""
}



const SignUpForm = () => {
    const[formFields, setFormFields] = useState(defaultformFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFiels = () =>{
        setFormFields(defaultformFields);
    };
    
    const handleSubmit = async(event) =>{
        event.preventDefault()

        
        
        if(password !== confirmPassword){
            alert("password do not match");
            return;
        }
    
        try{
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

        await createUserDoumentFromAuth(user, { displayName });
        resetFormFiels();

        } catch(error){
            if(error.code === "auth/email-alerady=in-use"){
                alert("cannot create use, email alerady in use");
            }
            console.log("user creation encountered an erro", error);
        }
    
    }

    const handleChange = (event) =>{
        const{name, value} = event.target;

        setFormFields({...formFields, [name]:value })
    };

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                label= "Display Name"
                type="text" 
                onChange={handleChange} 
                name="displayName" 
                value={displayName}
                required/>

                <FormInput 
                label="Email"
                text="email" 
                onChange={handleChange} 
                name="email" 
                value={email}
                required />

                <FormInput
                label="Password" 
                type="password" 
                onChange={handleChange} 
                name="password" 
                value={password}
                required />

                <FormInput
                label="Confirm Password"
                type="password" 
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}
                required />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;