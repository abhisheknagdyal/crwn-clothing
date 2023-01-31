import SignUpForm from "../../components/sign-up-form/sign-up-form";
import SignInForm from "../../components/sign-in-from/sign-in-form.component";
import "../authentication/authentication.styles.scss"

const Authentication = ()=>{
    
    return( 
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
};

export default Authentication;