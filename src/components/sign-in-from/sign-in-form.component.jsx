import { useState} from "react";

import FormInput from "../form-input/form-input.component";
import "../sign-in-from/sign-in-from.styles.scss"
import Button from "../button/button.component";


import { signInWithGooglePopup,
    //  createUserDoumentFromAuth,
     signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utlis";

const defaultformFields = {
    email : "",
    password: "",
}


const SignInForm = () => {
    const[formFields, setFormFields] = useState(defaultformFields);
    const {email, password} = formFields;

    

    const resetFormFiels = () =>{
        setFormFields(defaultformFields);
    };

    const signInWithGoogle = async () => {
        // const { user } = 
        await signInWithGooglePopup();
        // setCurrentUser(user);
        // await createUserDoumentFromAuth(user); 
    };

    const handleSubmit = async(event) =>{
        event.preventDefault()
    
        try{
            // const { user } = 
            await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(response)
            // setCurrentUser(user);

            
            resetFormFiels();
        } catch(error){        //error checking 
            switch(error.code){
                case "auth/wrong-password":
                    alert('incorrect password');
                    break;
                case "auth/user-not-found":
                    alert("This email is not registered");
                    break;
                default:
                    alert(error.code);
            }
        }
    
    }

    const handleChange = (event) =>{
        const{name, value} = event.target;

        setFormFields({...formFields, [name]:value })
    };

    return(
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

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

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType="google">Google sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;